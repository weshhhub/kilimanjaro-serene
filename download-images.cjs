const fs = require('fs');
const path = require('path');
const http = require('https'); // standard https module

const imagesToDownload = [
  // Heroes
  { url: "https://picsum.photos/seed/kilimanjaro/1920/1080", dest: "hero-kilimanjaro.jpg" },
  { url: "https://picsum.photos/seed/stays/1920/1080", dest: "hero-stays.jpg" },
  { url: "https://picsum.photos/seed/experiences-hero/1920/1080", dest: "hero-experiences.jpg" },
  { url: "https://picsum.photos/seed/activities/1920/1080", dest: "hero-activities.jpg" },
  { url: "https://picsum.photos/seed/cta/1920/800", dest: "cta-bg.jpg" },

  // Experience Hub & Category Images:
  { url: 'https://picsum.photos/seed/safari-hub/1200/800', dest: 'experience-safari-hub.jpg' },
  { url: 'https://picsum.photos/seed/walk-hub/1200/800', dest: 'experience-walk-hub.jpg' },
  { url: 'https://picsum.photos/seed/view-hub/1200/800', dest: 'experience-view-hub.jpg' },
  { url: 'https://picsum.photos/seed/relax-hub/1200/800', dest: 'experience-relax-hub.jpg' },

  // Rooms:
  { url: 'https://picsum.photos/seed/aframe/1200/800', dest: 'room-aframe.jpg' },
  { url: 'https://picsum.photos/seed/lakevilla/1200/800', dest: 'room-lakevilla.jpg' },
  { url: 'https://picsum.photos/seed/forestsuite/1200/800', dest: 'room-forestsuite.jpg' },

  // Activities:
  { url: 'https://picsum.photos/seed/forestwalk/800/600', dest: 'activity-forestwalk.jpg' },
  { url: 'https://picsum.photos/seed/cycling/800/600', dest: 'activity-cycling.jpg' },
  { url: 'https://picsum.photos/seed/teambuilding/800/600', dest: 'activity-teambuilding.jpg' },
  { url: 'https://picsum.photos/seed/workshop/800/600', dest: 'activity-workshop.jpg' },
  { url: 'https://picsum.photos/seed/safari/800/600', dest: 'activity-safari.jpg' },
  { url: 'https://picsum.photos/seed/photo/800/600', dest: 'activity-photo.jpg' },

  // Individual Experiences:
  { url: 'https://picsum.photos/seed/safari1/1200/800', dest: 'safari-private.jpg' },
  { url: 'https://picsum.photos/seed/safari2/1200/800', dest: 'safari-sunset.jpg' },
  { url: 'https://picsum.photos/seed/safari3/1200/800', dest: 'safari-nocturnal.jpg' },
  { url: 'https://picsum.photos/seed/walk1/1200/800', dest: 'walk-forest-immersion.jpg' },
  { url: 'https://picsum.photos/seed/walk2/1200/800', dest: 'walk-birdwatching.jpg' },
  { url: 'https://picsum.photos/seed/walk3/1200/800', dest: 'walk-medicinal.jpg' },
  { url: 'https://picsum.photos/seed/view1/1200/800', dest: 'view-sunrise.jpg' },
  { url: 'https://picsum.photos/seed/view2/1200/800', dest: 'view-stars.jpg' },
  { url: 'https://picsum.photos/seed/view3/1200/800', dest: 'view-helicopter.jpg' },
  { url: 'https://picsum.photos/seed/relax1/1200/800', dest: 'relax-meditation.jpg' },
  { url: 'https://picsum.photos/seed/relax2/1200/800', dest: 'relax-spa.jpg' },
  { url: 'https://picsum.photos/seed/relax3/1200/800', dest: 'relax-detox.jpg' },

  // Dining Regions:
  { url: 'https://picsum.photos/seed/central/800/600', dest: 'dining-central.jpg' },
  { url: 'https://picsum.photos/seed/western/800/600', dest: 'dining-western.jpg' },
  { url: 'https://picsum.photos/seed/coastal/800/600', dest: 'dining-coastal.jpg' },
  { url: 'https://picsum.photos/seed/rift/800/600', dest: 'dining-rift.jpg' },
  { url: 'https://picsum.photos/seed/eastern/800/600', dest: 'dining-eastern.jpg' },
  { url: 'https://picsum.photos/seed/northern/800/600', dest: 'dining-northern.jpg' },

  // Dining Details:
  { url: 'https://picsum.photos/seed/finedining/800/600', dest: 'dining-finedining.jpg' },
  { url: 'https://picsum.photos/seed/med/800/600', dest: 'dining-mediterranean.jpg' },
  { url: 'https://picsum.photos/seed/lakedining/800/600', dest: 'dining-lakedining.jpg' },
  { url: 'https://picsum.photos/seed/forestdining/800/600', dest: 'dining-forestdining.jpg' },
  { url: 'https://picsum.photos/seed/firepit/800/600', dest: 'dining-firepit.jpg' },
  { url: 'https://picsum.photos/seed/restaurant/800/600', dest: 'dining-restaurant.jpg' },
  { url: 'https://picsum.photos/seed/tasting/800/600', dest: 'dining-tasting.jpg' },
  { url: 'https://picsum.photos/seed/cultural/800/600', dest: 'dining-cultural.jpg' },
  { url: 'https://picsum.photos/seed/story/800/600', dest: 'dining-story.jpg' },
  { url: 'https://picsum.photos/seed/farm/800/600', dest: 'dining-farm.jpg' },

  // Dining Rituals:
  { url: 'https://picsum.photos/seed/breakfast/800/600', dest: 'ritual-breakfast.jpg' },
  { url: 'https://picsum.photos/seed/lunch/800/600', dest: 'ritual-lunch.jpg' },
  { url: 'https://picsum.photos/seed/dinner/800/600', dest: 'ritual-dinner.jpg' },

  // Extra UI Images:
  { url: "https://picsum.photos/seed/forest/800/1000", dest: "about-forest.jpg" },
  { url: "https://picsum.photos/seed/wildlife2/400/400", dest: "about-wildlife.jpg" }
];

// Ensure public/images structure exists
const publicDir = path.join(__dirname, 'public');
const imagesDir = path.join(publicDir, 'images');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

// Cleanup any old 1px fallback images (typically <= 100 bytes)
try {
  const files = fs.readdirSync(imagesDir);
  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    if (fs.statSync(filePath).isFile()) {
      const stats = fs.statSync(filePath);
      if (stats.size <= 100 && file !== 'README.md') {
        fs.unlinkSync(filePath);
        console.log(`[CLEANUP] Deleted old 1px fallback placeholder: ${file}`);
      }
    }
  }
} catch (err) {
  console.warn('[CLEANUP] Error cleaning up old fallbacks:', err);
}

// Fallback image source (1px transparent PNG base64) - NO LONGER USED FOR WRITING, WE PREFER REAL 404s !
const fallbackImageBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

function downloadImage({ url, dest }) {
  const targetPath = path.join(imagesDir, dest);
  
  if (fs.existsSync(targetPath)) {
    console.log(`[SKIP] Already exists: ${dest}`);
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    console.log(`[GET] Downloading ${url} to /images/${dest}...`);
    
    const request = http.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      // Handle redirects if any (picsum frequently redirects to fastly.jsdelivr or similar)
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        http.get(response.headers.location, (redirectResponse) => {
          if (redirectResponse.statusCode === 200) {
            const fileStream = fs.createWriteStream(targetPath);
            redirectResponse.pipe(fileStream);
            fileStream.on('finish', () => {
              fileStream.close();
              console.log(`[OK] Successfully downloaded: ${dest}`);
              resolve();
            });
          } else {
            writeFallback(targetPath, dest, resolve);
          }
        }).on('error', () => {
          writeFallback(targetPath, dest, resolve);
        });
      } else if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(targetPath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`[OK] Successfully downloaded: ${dest}`);
          resolve();
        });
      } else {
        writeFallback(targetPath, dest, resolve);
      }
    });

    request.on('error', () => {
      writeFallback(targetPath, dest, resolve);
    });

    // Timeout of 15 seconds per download to prevent building indefinitely
    request.setTimeout(15000, () => {
      request.destroy();
      writeFallback(targetPath, dest, resolve);
    });
  });
}

function writeFallback(targetPath, dest, resolve) {
  // We NO LONGER write a 1px file to disk. Having absolutely no file allows the web server 
  // to return a 404 block, which triggers the client browser's Image Error event clean and clear,
  // making sure user uploaded images are NEVER overridden by cached 1px placeholders!
  console.log(`[FALLBACK] Skipping local file creation to permit clean client fallback behavior for: ${dest}`);
  resolve();
}

async function run() {
  console.log('--- STARTING IMAGE RETRIEVAL PROCESS ---');
  for (const img of imagesToDownload) {
    try {
      await downloadImage(img);
    } catch (e) {
      console.warn(`[WARN] Skipping failure on ${img.dest}:`, e);
    }
  }
  console.log('--- ALL IMAGES DOWNLOADED OR RESOLVED ---');
}

run();
