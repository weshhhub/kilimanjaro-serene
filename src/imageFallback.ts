// Intelligent Image Fallback System
// Automatically swaps 1px placeholder images (where server had offline/firewall restrictions) 
// to their high-resolution live equivalents on the user's browser, while allowing custom uploaded images.

const FALLBACK_MAP: Record<string, string> = {
  // Stays & Accommodations
  "room-aframe.jpg": "https://picsum.photos/seed/aframe/1200/800",
  "room-lakevilla.jpg": "https://picsum.photos/seed/lakevilla/1200/800",
  "room-forestsuite.jpg": "https://picsum.photos/seed/forestsuite/1200/800",

  // Hubs
  "experience-safari-hub.jpg": "https://picsum.photos/seed/safari-hub/1200/800",
  "experience-walk-hub.jpg": "https://picsum.photos/seed/walk-hub/1200/800",
  "experience-view-hub.jpg": "https://picsum.photos/seed/view-hub/1200/800",
  "experience-relax-hub.jpg": "https://picsum.photos/seed/relax-hub/1200/800",

  // Wildlife Safaris
  "safari-private.jpg": "https://picsum.photos/seed/safari1/1200/800",
  "safari-sunset.jpg": "https://picsum.photos/seed/safari2/1200/800",
  "safari-nocturnal.jpg": "https://picsum.photos/seed/safari3/1200/800",

  // Nature Walks
  "walk-forest-immersion.jpg": "https://picsum.photos/seed/walk1/1200/800",
  "walk-birdwatching.jpg": "https://picsum.photos/seed/walk2/1200/800",
  "walk-medicinal.jpg": "https://picsum.photos/seed/walk3/1200/800",

  // Scenic Views
  "view-sunrise.jpg": "https://picsum.photos/seed/view1/1200/800",
  "view-stars.jpg": "https://picsum.photos/seed/view2/1200/800",
  "view-helicopter.jpg": "https://picsum.photos/seed/view3/1200/800",

  // Relaxation & Retreat
  "relax-meditation.jpg": "https://picsum.photos/seed/relax1/1200/800",
  "relax-spa.jpg": "https://picsum.photos/seed/relax2/1200/800",
  "relax-detox.jpg": "https://picsum.photos/seed/relax3/1200/800",

  // Resort Activities
  "activity-forestwalk.jpg": "https://picsum.photos/seed/forestwalk/800/600",
  "activity-cycling.jpg": "https://picsum.photos/seed/cycling/800/600",
  "activity-teambuilding.jpg": "https://picsum.photos/seed/teambuilding/800/600",
  "activity-workshop.jpg": "https://picsum.photos/seed/workshop/800/600",
  "activity-safari.jpg": "https://picsum.photos/seed/safari/800/600",
  "activity-photo.jpg": "https://picsum.photos/seed/photo/800/600",

  // Dining regions
  "dining-central.jpg": "https://picsum.photos/seed/central/800/600",
  "dining-western.jpg": "https://picsum.photos/seed/western/800/600",
  "dining-coastal.jpg": "https://picsum.photos/seed/coastal/800/600",
  "dining-rift.jpg": "https://picsum.photos/seed/rift/800/600",
  "dining-eastern.jpg": "https://picsum.photos/seed/eastern/800/600",
  "dining-northern.jpg": "https://picsum.photos/seed/northern/800/600",

  // Dining Specials & Details
  "dining-finedining.jpg": "https://picsum.photos/seed/finedining/800/600",
  "dining-mediterranean.jpg": "https://picsum.photos/seed/med/800/600",
  "dining-lakedining.jpg": "https://picsum.photos/seed/lakedining/800/600",
  "dining-forestdining.jpg": "https://picsum.photos/seed/forestdining/800/600",
  "dining-firepit.jpg": "https://picsum.photos/seed/firepit/800/600",
  "dining-restaurant.jpg": "https://picsum.photos/seed/restaurant/800/600",
  "dining-tasting.jpg": "https://picsum.photos/seed/tasting/800/600",
  "dining-cultural.jpg": "https://picsum.photos/seed/cultural/800/600",
  "dining-story.jpg": "https://picsum.photos/seed/story/800/600",
  "dining-farm.jpg": "https://picsum.photos/seed/farm/800/600",

  // Dining Ritual Blocks
  "ritual-breakfast.jpg": "https://picsum.photos/seed/breakfast/800/600",
  "ritual-lunch.jpg": "https://picsum.photos/seed/lunch/800/600",
  "ritual-outline.jpg": "https://picsum.photos/seed/dinner/800/600",
  "ritual-dinner.jpg": "https://picsum.photos/seed/dinner/800/600",

  // Hero Banners
  "hero-kilimanjaro.jpg": "https://picsum.photos/seed/kilimanjaro/1920/1080",
  "hero-stays.jpg": "https://picsum.photos/seed/stays/1920/1080",
  "hero-experiences.jpg": "https://picsum.photos/seed/experiences-hero/1920/1080",
  "hero-activities.jpg": "https://picsum.photos/seed/activities/1920/1080",
  "cta-bg.jpg": "https://picsum.photos/seed/cta/1920/800",

  // Intermediates/About
  "about-forest.jpg": "https://picsum.photos/seed/forest/800/1000",
  "about-wildlife.jpg": "https://picsum.photos/seed/wildlife2/400/400"
};

function scanAndRestoreImages() {
  const images = document.querySelectorAll('img');
  images.forEach((img) => {
    const src = img.getAttribute('src');
    if (!src) return;

    // Check if the source refers to a local application image path
    if (src.includes('/images/')) {
      const filename = src.split('/').pop() || '';
      const fallbackUrl = FALLBACK_MAP[filename];
      if (!fallbackUrl) return;

      const performFallback = () => {
        // If image natural width is 1 (our 1px base64 placeholder), swap it!
        if (img.naturalWidth <= 1 && img.naturalHeight <= 1) {
          img.src = fallbackUrl;
        }
      };

      if (img.complete) {
        performFallback();
      } else {
        // Use a flag to avoid adding redundant event listeners to same image
        if (!(img as any).__fallbackAttached) {
          (img as any).__fallbackAttached = true;
          img.addEventListener('load', performFallback);
          img.addEventListener('error', () => {
            img.src = fallbackUrl;
          });
        }
      }
    }
  });
}

// Export initialization function to act on load
export function initImageFallbacks() {
  if (typeof window === 'undefined') return;

  // Run immediately
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scanAndRestoreImages);
  } else {
    scanAndRestoreImages();
  }

  // Monitor DOM injections/updates reactively using MutationObserver
  try {
    const observer = new MutationObserver(() => {
      scanAndRestoreImages();
    });
    observer.observe(document.body || document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['src']
    });
  } catch (e) {
    console.error('MutationObserver failed to initialize:', e);
  }

  // Backup polling sweep every 800ms
  setInterval(scanAndRestoreImages, 800);
}
