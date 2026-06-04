import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Booking, PaymentStatus, ExperienceBooking } from '../types';
import { 
  Search, Filter, Download, CheckCircle, Clock, XCircle, Mail, Calendar, Heart, 
  AlertTriangle, AlertCircle, Bell, Sparkles, RefreshCw, CheckSquare, MessageSquare 
} from 'lucide-react';
import Button from './ui/Button';
import jsPDF from 'jspdf';

interface AdminDashboardProps {
  bookings: Booking[];
  experienceBookings: ExperienceBooking[];
  onUpdateStatus: (bookingId: string, status: PaymentStatus) => void;
}

export default function AdminDashboard({ bookings, experienceBookings, onUpdateStatus }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'stays' | 'experiences' | 'alerts'>('alerts');
  const [filter, setFilter] = useState<PaymentStatus | 'All'>('All');
  const [search, setSearch] = useState('');

  // Alerts storage persisting resolved alerts
  const [resolvedAlertIds, setResolvedAlertIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('kilimanjaro_resolved_alerts');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [alertSeverityFilter, setAlertSeverityFilter] = useState<'all' | 'high' | 'medium' | 'info'>('all');
  const [alertTypeFilter, setAlertTypeFilter] = useState<'all' | 'special_request' | 'unpaid_pending' | 'urgent_arrival'>('all');
  const [showResolved, setShowResolved] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('kilimanjaro_resolved_alerts', JSON.stringify(resolvedAlertIds));
    } catch (e) {
      console.error(e);
    }
  }, [resolvedAlertIds]);

  const filteredBookings = bookings.filter(b => {
    const matchesFilter = filter === 'All' || b.status === filter;
    const matchesSearch = b.customerName.toLowerCase().includes(search.toLowerCase()) || 
                         b.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
                         b.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredExperienceBookings = experienceBookings.filter(b => {
    const matchesFilter = filter === 'All' || b.status === filter;
    const matchesSearch = b.customerName.toLowerCase().includes(search.toLowerCase()) || 
                         b.customerEmail.toLowerCase().includes(search.toLowerCase()) ||
                         b.id.toLowerCase().includes(search.toLowerCase()) ||
                         b.experienceTitle.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Compile Alerts System
  const alerts: {
    id: string;
    type: 'special_request' | 'unpaid_pending' | 'urgent_arrival';
    title: string;
    guestName: string;
    guestEmail: string;
    details: string;
    severity: 'high' | 'medium' | 'info';
    bookingId: string;
    bookingType: 'Stay' | 'Experience';
    dateStr: string;
    booking: Booking | ExperienceBooking;
  }[] = [];

  bookings.forEach(b => {
    const isPending = b.status === 'Pending';
    
    // Check if check-in is imminent (within 3 days)
    const arrivalDateObj = new Date(b.arrivalDate);
    const todayDateObj = new Date();
    const diffTime = arrivalDateObj.getTime() - todayDateObj.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    // Imminent is within 3 days
    const isImminent = diffDays >= 0 && diffDays <= 3;

    if (isPending) {
      alerts.push({
        id: `pending-stay-${b.id}`,
        type: 'unpaid_pending',
        title: 'Pending Stay Payment',
        guestName: b.customerName,
        guestEmail: b.customerEmail,
        details: `Stay booked for ${b.roomTitle} ($${b.totalAmount}) is awaiting payment verification.`,
        severity: isImminent ? 'high' : 'medium',
        bookingId: b.id,
        bookingType: 'Stay',
        dateStr: `Arrival: ${new Date(b.arrivalDate).toLocaleDateString()}`,
        booking: b
      });
    }

    if (isImminent && b.status === 'Paid') {
      const addOnList = b.selectedAddOns.map(a => a.title);
      const activityList = b.selectedActivities.map(ac => ac.title);
      const prepList = [...addOnList, ...activityList].join(', ');
      
      alerts.push({
        id: `imminent-checkin-${b.id}`,
        type: 'urgent_arrival',
        title: 'Imminent Check-In Prep',
        guestName: b.customerName,
        guestEmail: b.customerEmail,
        details: `Paid guest arriving in ${diffDays === 0 ? 'today' : diffDays + ' days'} (${new Date(b.arrivalDate).toLocaleDateString()}). Prepare ${b.roomTitle}. Co-ordinate services: ${prepList || 'standard premium setup'}.`,
        severity: 'high',
        bookingId: b.id,
        bookingType: 'Stay',
        dateStr: `Check-in: ${new Date(b.arrivalDate).toLocaleDateString()}`,
        booking: b
      });
    }
  });

  experienceBookings.forEach(b => {
    // 1) Special requests from experience bookings
    if (b.specialRequests && b.specialRequests.trim().length > 0) {
      alerts.push({
        id: `special-req-${b.id}`,
        type: 'special_request',
        title: `${b.experienceTitle} Special Request`,
        guestName: b.customerName,
        guestEmail: b.customerEmail,
        details: b.specialRequests,
        severity: 'high',
        bookingId: b.id,
        bookingType: 'Experience',
        dateStr: `Reservation: ${new Date(b.date).toLocaleDateString()}${b.time ? ' @ ' + b.time : ''}`,
        booking: b
      });
    }

    // 2) Pending payments
    if (b.status === 'Pending') {
      alerts.push({
        id: `pending-exp-${b.id}`,
        type: 'unpaid_pending',
        title: 'Pending Experience Payment',
        guestName: b.customerName,
        guestEmail: b.customerEmail,
        details: `Experience reservation for ${b.experienceTitle} ($${b.totalAmount}) is pending payment confirmation.`,
        severity: 'medium',
        bookingId: b.id,
        bookingType: 'Experience',
        dateStr: `Date: ${new Date(b.date).toLocaleDateString()}`,
        booking: b
      });
    }
  });

  const activeAlerts = alerts.filter(a => !resolvedAlertIds.includes(a.id));
  const resolvedAlerts = alerts.filter(a => resolvedAlertIds.includes(a.id));

  const displayAlertsList = (showResolved ? resolvedAlerts : activeAlerts).filter(a => {
    const matchesSeverity = alertSeverityFilter === 'all' || a.severity === alertSeverityFilter;
    const matchesType = alertTypeFilter === 'all' || a.type === alertTypeFilter;
    const matchesSearch = a.guestName.toLowerCase().includes(search.toLowerCase()) || 
                          a.guestEmail.toLowerCase().includes(search.toLowerCase()) ||
                          a.details.toLowerCase().includes(search.toLowerCase()) ||
                          a.title.toLowerCase().includes(search.toLowerCase());
    return matchesSeverity && matchesType && matchesSearch;
  });

  // Calculate alerts statistics
  const highSeverityCount = activeAlerts.filter(a => a.severity === 'high').length;
  const specialRequestsCount = activeAlerts.filter(a => a.type === 'special_request').length;
  const pendingRevenueSum = activeAlerts
    .filter(a => a.type === 'unpaid_pending')
    .reduce((sum, a) => sum + a.booking.totalAmount, 0);

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

  const generateExperienceInvoice = (booking: ExperienceBooking) => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.text('KILIMANJARO SERENE RETREAT', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text('EXPERIENCE INVOICE', 105, 30, { align: 'center' });
    
    // Info
    doc.setFontSize(10);
    doc.text(`Reservation ID: ${booking.id}`, 20, 50);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 55);
    doc.text(`Status: ${booking.status}`, 20, 60);
    
    doc.text('BILL TO:', 20, 75);
    doc.setFontSize(12);
    doc.text(booking.customerName, 20, 82);
    doc.setFontSize(10);
    doc.text(booking.customerEmail, 20, 87);
    doc.text(booking.customerPhone, 20, 92);
    
    // Details Table
    doc.line(20, 105, 190, 105);
    doc.text('Description', 25, 112);
    doc.text('Amount', 160, 112);
    doc.line(20, 117, 190, 117);
    
    let y = 125;
    doc.text(`${booking.experienceTitle} (${booking.guests} guests)`, 25, y);
    doc.text(`$${booking.totalAmount}`, 160, y);
    
    y += 10;
    doc.text(`Date: ${new Date(booking.date).toLocaleDateString()}`, 25, y);
    if (booking.time) {
      y += 5;
      doc.text(`Time: ${booking.time}`, 25, y);
    }
    
    if (booking.specialRequests) {
      y += 15;
      doc.setFontSize(8);
      doc.text('SPECIAL REQUESTS:', 25, y);
      y += 5;
      doc.text(booking.specialRequests, 25, y, { maxWidth: 160 });
    }
    
    doc.line(20, y + 15, 190, y + 15);
    y += 25;
    doc.setFontSize(14);
    doc.text('TOTAL AMOUNT:', 120, y);
    doc.text(`$${booking.totalAmount}`, 160, y);
    
    doc.save(`Experience_Invoice_${booking.id}.pdf`);
  };

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-display text-primary mb-2">Staff Operations Portal</h2>
          <p className="text-secondary text-sm">Review real-time hotel activity, manage reservations, and coordinate guest care actions.</p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
            <input 
              type="text" 
              placeholder="Search by guest, title, details..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 pr-6 py-3 bg-surface border border-primary/10 rounded-xl focus:outline-none focus:border-accent w-64 text-sm"
            />
          </div>
          
          {activeTab !== 'alerts' && (
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="px-6 py-3 bg-surface border border-primary/10 rounded-xl focus:outline-none focus:border-accent text-sm font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          )}
        </div>
      </div>

      {/* Tabs list with beautiful live badge count on Active Alerts */}
      <div className="flex gap-8 mb-8 border-b border-primary/10">
        <button 
          onClick={() => setActiveTab('alerts')}
          className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative flex items-center gap-2 ${
            activeTab === 'alerts' ? 'text-accent' : 'text-primary/40 hover:text-primary'
          }`}
        >
          Active Alerts
          {activeAlerts.length > 0 && (
            <span className="px-2.5 py-0.5 text-[10px] font-bold bg-accent text-primary rounded-full animate-pulse">
              {activeAlerts.length}
            </span>
          )}
          {activeTab === 'alerts' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
        </button>

        <button 
          onClick={() => setActiveTab('stays')}
          className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${
            activeTab === 'stays' ? 'text-accent' : 'text-primary/40 hover:text-primary'
          }`}
        >
          Stay Bookings
          {activeTab === 'stays' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
        </button>

        <button 
          onClick={() => setActiveTab('experiences')}
          className={`pb-4 text-sm font-bold uppercase tracking-widest transition-all relative ${
            activeTab === 'experiences' ? 'text-accent' : 'text-primary/40 hover:text-primary'
          }`}
        >
          Experience Reservations
          {activeTab === 'experiences' && <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />}
        </button>
      </div>

      {activeTab === 'alerts' ? (
        <div className="space-y-6">
          {/* Alerts Command Center Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-red-50/50 p-6 rounded-3xl border border-red-100/50 flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                <AlertTriangle size={24} />
              </div>
              <div>
                <h4 className="text-2xl font-display font-bold text-red-900">{highSeverityCount}</h4>
                <p className="text-[10px] font-bold text-red-700/70 uppercase tracking-widest leading-none mt-1">Urgent Action Items</p>
              </div>
            </div>

            <div className="bg-accent/5 p-6 rounded-3xl border border-accent/10 flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/10 text-accent rounded-full flex items-center justify-center">
                <Sparkles size={24} />
              </div>
              <div>
                <h4 className="text-2xl font-display font-bold text-primary">{specialRequestsCount}</h4>
                <p className="text-[10px] font-bold text-accent uppercase tracking-widest leading-none mt-1">Special Guest Requests</p>
              </div>
            </div>

            <div className="bg-green-50/50 p-6 rounded-3xl border border-green-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center">
                <CheckCircle size={24} />
              </div>
              <div>
                <h4 className="text-2xl font-display font-bold text-green-950">${pendingRevenueSum}</h4>
                <p className="text-[10px] font-bold text-green-800 uppercase tracking-widest leading-none mt-1">Awaiting Verification Revenue</p>
              </div>
            </div>
          </div>

          {/* Alerts Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap gap-3">
              <select 
                value={alertSeverityFilter}
                onChange={(e) => setAlertSeverityFilter(e.target.value as any)}
                className="px-4 py-2 bg-surface border border-primary/10 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent"
              >
                <option value="all">All Urgencies</option>
                <option value="high">🔴 High Urgency</option>
                <option value="medium">🟡 Medium Urgency</option>
                <option value="info">🔵 Information</option>
              </select>

              <select 
                value={alertTypeFilter}
                onChange={(e) => setAlertTypeFilter(e.target.value as any)}
                className="px-4 py-2 bg-surface border border-primary/10 rounded-xl text-xs font-semibold focus:outline-none focus:border-accent"
              >
                <option value="all">All Alert Types</option>
                <option value="special_request">✨ Guest Special Requests</option>
                <option value="unpaid_pending">💳 Pending Payments</option>
                <option value="urgent_arrival">⏰ Upcoming Check-ins</option>
              </select>

              <button
                onClick={() => setShowResolved(!showResolved)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all flex items-center gap-2 ${
                  showResolved 
                    ? 'bg-primary/10 text-primary border-primary/15 font-bold'
                    : 'bg-transparent text-primary/40 border-primary/10 hover:border-primary/20'
                }`}
              >
                <CheckSquare size={14} />
                {showResolved ? 'Showing Resolved' : 'Show Acknowledged'}
              </button>
            </div>

            <div className="text-[11px] text-secondary font-medium uppercase tracking-wider">
              Showing {displayAlertsList.length} of {showResolved ? resolvedAlerts.length : activeAlerts.length} {showResolved ? 'acknowledged' : 'active'} alerts
            </div>
          </div>

          {/* Alerts Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayAlertsList.map((alert) => {
              const isHigh = alert.severity === 'high';
              const isMedium = alert.severity === 'medium';
              
              const severityBorderColor = isHigh ? 'border-l-[6px] border-l-red-500' : isMedium ? 'border-l-[6px] border-l-amber-500' : 'border-l-[6px] border-l-blue-400';
              const severityBadgeStyle = isHigh ? 'bg-red-100 text-red-800' : isMedium ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800';
              
              let iconComponent = <Bell size={18} />;
              if (alert.type === 'special_request') iconComponent = <Sparkles size={18} />;
              if (alert.type === 'unpaid_pending') iconComponent = <Clock size={15} />;
              if (alert.type === 'urgent_arrival') iconComponent = <Calendar size={18} />;

              return (
                <motion.div 
                  layout
                  key={alert.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  className={`bg-surface rounded-3xl p-6 border border-primary/5 shadow-md flex flex-col justify-between hover:shadow-lg transition-all ${severityBorderColor}`}
                >
                  <div>
                    {/* Card Header */}
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          alert.type === 'special_request' ? 'bg-accent/10 text-accent' :
                          alert.type === 'unpaid_pending' ? 'bg-amber-100/60 text-amber-600' :
                          'bg-red-100/60 text-red-500'
                        }`}>
                          {iconComponent}
                        </div>
                        <div>
                          <h5 className="font-display font-medium text-primary leading-tight text-sm sm:text-base">{alert.title}</h5>
                          <span className={`inline-block mt-1 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${severityBadgeStyle}`}>
                            {alert.severity} urgency
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-primary/40 font-semibold">#{alert.bookingId}</span>
                    </div>

                    {/* Guest Details */}
                    <div className="mb-4 text-xs">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
                        <span className="font-display font-semibold text-primary">{alert.guestName}</span>
                        <span className="text-primary/30 hidden sm:inline">•</span>
                        <span className="text-primary/55 font-mono">{alert.guestEmail}</span>
                      </div>
                      <div className="text-primary/40 uppercase tracking-widest text-[9px] font-bold">
                        {alert.bookingType} Reserve • {alert.dateStr}
                      </div>
                    </div>

                    {/* Request Details Paragraph Box */}
                    <div className="bg-background/40 border border-primary/5 rounded-2xl p-4 text-xs leading-relaxed text-primary/80 mb-6 font-medium italic">
                      "{alert.details}"
                    </div>
                  </div>

                  {/* Actions bar */}
                  <div className="flex justify-between items-center gap-4 pt-4 border-t border-primary/5">
                    <div className="flex gap-2">
                      <a 
                        href={`mailto:${alert.guestEmail}?subject=Regarding Your Kilimanjaro Serene Retreat Booking ${alert.bookingId}`}
                        className="px-3.5 py-2 bg-primary/5 hover:bg-primary/10 text-primary/70 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 cursor-pointer no-underline"
                        title="Email Guest"
                      >
                        <Mail size={13} />
                        Email Guest
                      </a>
                    </div>

                    <div className="flex gap-2">
                      {alert.type === 'unpaid_pending' && (
                        <button 
                          onClick={() => {
                            onUpdateStatus(alert.bookingId, 'Paid');
                            setResolvedAlertIds(prev => [...prev, alert.id]);
                          }}
                          className="px-4 py-2 bg-green-700 hover:bg-green-850 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                        >
                          <CheckCircle size={13} />
                          Approve Payment
                        </button>
                      )}
                      
                      {!resolvedAlertIds.includes(alert.id) ? (
                        <button 
                          onClick={() => setResolvedAlertIds(prev => [...prev, alert.id])}
                          className={`px-4 py-2 ${alert.type === 'unpaid_pending' ? 'bg-primary/5 hover:bg-primary/10 text-primary/70' : 'bg-primary text-background'} rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5`}
                        >
                          <CheckSquare size={13} />
                          Resolve
                        </button>
                      ) : (
                        <button 
                          onClick={() => setResolvedAlertIds(prev => prev.filter(id => id !== alert.id))}
                          className="px-4 py-2 bg-primary/5 hover:bg-primary/10 text-primary/70 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                        >
                          <RefreshCw size={13} />
                          Re-open
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {displayAlertsList.length === 0 && (
              <div className="col-span-1 md:col-span-2 bg-primary/2 border border-primary/5 rounded-[2.5rem] py-20 px-6 text-center shadow-inner">
                <div className="w-14 h-14 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckSquare size={28} />
                </div>
                <h4 className="text-xl font-display text-primary font-bold mb-1">All Systems Clear</h4>
                <p className="text-xs text-secondary max-w-sm mx-auto leading-relaxed">
                  Excellent! There are currently no outstanding special requests, imminent check-ins, or unpaid payments needing coordination.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-surface rounded-[2.5rem] overflow-hidden border border-primary/5 shadow-xl">
          <div className="overflow-x-auto">
            {activeTab === 'stays' ? (
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
                        No stay bookings found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary/5 text-xs font-bold uppercase tracking-widest text-primary/60">
                    <th className="px-8 py-6">Res ID</th>
                    <th className="px-8 py-6">Customer</th>
                    <th className="px-8 py-6">Experience</th>
                    <th className="px-8 py-6">Date & Time</th>
                    <th className="px-8 py-6">Guests</th>
                    <th className="px-8 py-6">Total</th>
                    <th className="px-8 py-6">Status</th>
                    <th className="px-8 py-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/5">
                  {filteredExperienceBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-primary/[0.02] transition-colors">
                      <td className="px-8 py-6 font-mono text-xs">{booking.id}</td>
                      <td className="px-8 py-6">
                        <div className="font-medium text-primary">{booking.customerName}</div>
                        <div className="text-xs text-secondary">{booking.customerEmail}</div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="text-sm font-medium">{booking.experienceTitle}</div>
                        <div className="text-[10px] uppercase tracking-widest text-accent">{booking.experienceType}</div>
                      </td>
                      <td className="px-8 py-6 text-sm">
                        {new Date(booking.date).toLocaleDateString()}
                        {booking.time && <div className="text-xs text-secondary">{booking.time}</div>}
                      </td>
                      <td className="px-8 py-6 text-sm">{booking.guests}</td>
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
                            onClick={() => generateExperienceInvoice(booking)}
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
                            title="Cancel Reservation"
                          >
                            <XCircle size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredExperienceBookings.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-8 py-20 text-center text-secondary">
                        No experience reservations found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
