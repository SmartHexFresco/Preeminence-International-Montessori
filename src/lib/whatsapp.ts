export const WHATSAPP_NUMBER = "+234 803 794 4661";

const toWhatsAppDigits = (number: string) => number.replace(/[\s+]/g, "");

export const DEFAULT_WA_MESSAGE =
  "Hello! I'd like to know more about Preeminence International Montessori.";

export const whatsappLink = (message: string = DEFAULT_WA_MESSAGE) =>
  `https://wa.me/${toWhatsAppDigits(WHATSAPP_NUMBER)}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

export type GeoCoords = { lat: number; lng: number };

export const getLocation = (): Promise<GeoCoords | null> =>
  new Promise((resolve) => {
    if (!("geolocation" in navigator)) return resolve(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => resolve(null),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60000 }
    );
  });

export const locationLink = (loc: GeoCoords) =>
  `https://www.google.com/maps?q=${loc.lat},${loc.lng}`;
