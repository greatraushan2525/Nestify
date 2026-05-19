/**
 * Google Maps API Loader
 * This module loads the Google Maps API using import.meta.env
 * It must be imported as a module script to access import.meta
 */

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

if (apiKey) {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}
