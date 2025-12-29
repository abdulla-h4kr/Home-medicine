import { StorageLocation } from "../models/Location";
import { storage } from "../storage/storage";

const LOCATIONS_KEY = "home-medicine:locations";

export const locationRepository = {
  async list(): Promise<StorageLocation[]> {
    return storage.load<StorageLocation[]>(LOCATIONS_KEY, []);
  },
  async saveAll(locations: StorageLocation[]): Promise<void> {
    await storage.save(LOCATIONS_KEY, locations);
  },
};
