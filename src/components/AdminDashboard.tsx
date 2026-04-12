import { useState } from 'react';
import { motion } from 'motion/react';
import { Booking, PaymentStatus } from '../types';
import { Search, Filter, Download, CheckCircle, Clock, XCircle, Mail } from 'lucide-react';
import Button from './ui/Button';
import jsPDF from 'jspdf';

interface AdminDashboardProps {
  bookings: Booking[];
  onUpdateStatus: (bookingId: string, status: PaymentStatus) => void;
}

export default function AdminDashboard({ bookings, onUpdateStatus }: AdminDashboardProps) {
  const [filter, setFilter] = useState<PaymentStatus | 'All'>('All');
  const [search, setSearch] = useState('');

  const filteredBookings = bookings.filter(b => {
    const matchesFilter = filter === 'All' || b.status === filter;
    const matchesSearch = b.customerName.toLowerCase().includes(search.toLowerCase()) || 
                         b.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
                         b.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const generateInvoice = (booking: Booking) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.text('KILIMANJARO SERENE RETREAT', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('INVOICE', 105, 30, { align: 'center' });
    
    // Info
    doc.setFontSize(10);
    doc.text(`Invoice ID: ${booking.id}`, 20, 50);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 55);
    doc.text(`Status: ${booking.status}`, 20, 60);
    
    doc.text('BILL TO:', 20, 75);
    doc.setFontSize(12);
    doc.text(booking.customerName, 20, 82);
    doc.setFontSize(10);
    doc.text(booking.customerEmail, 20, 87);
    
    // Details Table
    doc.line(20, 100, 190, 100);
    doc.text('Description', 25, 107);
    doc.text('Amount', 160, 107);
    doc.line(20, 112, 190, 112);
    
    let y = 120;
    doc.text(`${booking.roomTitle} (${booking.guests} guests)`, 25, y);
    doc.text(`$${booking.totalAmount - booking.selectedAddOns.length * 50}`, 160, y); // Simplified calculation for demo
    
    booking.selectedAddOns.forEach(addon => {
      y += 10;
      doc.text(addon.title, 25, y);
      doc.text('$50', 160, y);
    });

    booking.selectedActivities.forEach(activity => {
      y += 10;
      doc.text(activity.title, 25, y);
      doc.text(`$${activity.price}`, 160, y);
    });
    
    doc.line(20, y + 10, 190, y + 10);
    y += 20;
    doc.setFontSize(14);
    doc.text('TOTAL AMOUNT:', 120, y);
    doc.text(`$${booking.totalAmount}`, 160, y);
    
    doc.save(`Invoice_${booking.id}.pdf`);
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-display text-primary mb-2">Admin Dashboard</h2>
          <p className="text-secondary">Manage your bookings and payment statuses.</p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
            <input 
              type="text" 
              placeholder="Search bookings..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-6 py-3 bg-surface border border-primary/10 rounded-xl focus:outline-none focus:border-accent w-64"
            />
          </div>
          
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-6 py-3 bg-surface border border-primary/10 rounded-xl focus:outline-none focus:border-accent"
          >
            <option value="All">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-surface rounded-[2.5rem] overflow-hidden border border-primary/5 shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary/5 text-xs font-bold uppercase tracking-widest text-primary/60">
                <th className="px-8 py-6">Booking ID</th>
                <th className="px-8 py-6">Customer</th>
                <th className="px-8 py-6">Room</th>
                <th className="px-8 py-6">Dates</th>
                <th className="px-8 py-6">Total</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-primary/[0.02] transition-colors">
                  <td className="px-8 py-6 font-mono text-xs">{booking.id}</td>
                  <td className="px-8 py-6">
                    <div className="font-medium text-primary">{booking.customerName}</div>
                    <div className="text-xs text-secondary">{booking.customerEmail}</div>
                  </td>
                  <td className="px-8 py-6 text-sm">{booking.roomTitle}</td>
                  <td className="px-8 py-6 text-sm">
                    {new Date(booking.arrivalDate).toLocaleDateString()} - {new Date(booking.departureDate).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6 font-bold text-primary">${booking.totalAmount}</td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      booking.status === 'Paid' ? 'bg-green-100 text-green-700' :
                      booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => generateInvoice(booking)}
                        className="p-2 hover:bg-accent/10 text-accent rounded-lg transition-colors"
                        title="Download Invoice"
                      >
                        <Download size={18} />
                      </button>
                      <button 
                        onClick={() => onUpdateStatus(booking.id, 'Paid')}
                        className="p-2 hover:bg-green-100 text-green-600 rounded-lg transition-colors"
                        title="Mark as Paid"
                      >
                        <CheckCircle size={18} />
                      </button>
                      <button 
                        onClick={() => onUpdateStatus(booking.id, 'Cancelled')}
                        className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                        title="Cancel Booking"
                      >
                        <XCircle size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-8 py-20 text-center text-secondary">
                    No bookings found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
