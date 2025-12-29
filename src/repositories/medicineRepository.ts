import { Medicine } from "../models/Medicine";
import { storage } from "../storage/storage";

const MEDICINES_KEY = "home-medicine:medicines";

export const medicineRepository = {
  async list(): Promise<Medicine[]> {
    return storage.load<Medicine[]>(MEDICINES_KEY, []);
  },
  async saveAll(medicines: Medicine[]): Promise<void> {
    await storage.save(MEDICINES_KEY, medicines);
  },
};
