// const GOOGLE_API_KEY = "AIzaSyBQDwsoegJtHP-g4vz6m0YjHkXc6b-5JQo";
const GOOGLE_API_KEY = "AIzaSyAZDw0Bt87XfZ5Cjz94ec-IgZVkI8JUJR0";

export const getMapPreview = (lat, lng) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
};

export const getAddress = async (lat, lng) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch address");
  }
  const data = await response.json();
  return data.results[0].formatted_address;
};
