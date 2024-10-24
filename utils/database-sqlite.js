import * as SQLite from "expo-sqlite";
import Place from "../models/place";

const dbConnection = SQLite.openDatabaseAsync("places.db");

export const initDatabase = async () => {
  try {
    const db = await dbConnection;
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS places (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        imageUri TEXT NOT NULL,
        address TEXT NOT NULL,
        latitude REAL NOT NULL,
        longitude REAL NOT NULL
      )`
    );
  } catch (error) {
    console.error("Database initialization failed:", error);
    throw error;
  }
};

export const insertPlace = async (place) => {
  try {
    const db = await dbConnection;
    const sql = `
      INSERT INTO places (title, imageUri, address, latitude, longitude) 
      VALUES (?, ?, ?, ?, ?);
    `;
    const values = [
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.lng,
    ];

    await db.runAsync(sql, values);

    console.log("Place inserted successfully");
  } catch (error) {
    console.error("Failed to insert place:", error);
  }
};

export const fetchPlaces = async () => {
  const db = await dbConnection;
  const result = await db.getAllAsync("SELECT * FROM places");

  const places = [];
  for (const place of result) {
    places.push(
      new Place(
        place.title,
        place.imageUri,
        {
          lat: place.latitude,
          lng: place.longitude,
          address: place.address,
        },
        place.id
      )
    );
  }

  return places;
};

export const fetchPlaceDetails = async (placeId) => {
  const db = await dbConnection;
  const result = await db.getFirstAsync(`SELECT * FROM places WHERE id = ?`, [
    placeId,
  ]);

  const place = new Place(
    result.title,
    result.imageUri,
    {
      address: result.address,
      lat: result.latitude,
      lng: result.longitude,
    },
    result.id
  );

  return place;
};
