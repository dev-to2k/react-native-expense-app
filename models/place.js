class Place {
  constructor(id, title, imageUri, location) {
    this.id = id;
    this.title = title;
    this.imageUri = imageUri;
    this.address = location.address;
    this.location = { lat: location.lat, lng: location.lng };
  }
}

export default Place;
