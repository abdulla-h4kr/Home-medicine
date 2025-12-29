import { Medicine, MedicineTag } from "../models/Medicine";
import { StorageLocation } from "../models/Location";
import { medicineRepository } from "../repositories/medicineRepository";
import { locationRepository } from "../repositories/locationRepository";
import { createId } from "../utils/id";

const defaultLocations: StorageLocation[] = [
  {
    id: "default-drawer",
    name: "Medicine Drawer",
    description: "Primary household medicine drawer.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "default-first-aid",
    name: "First Aid Box",
    description: "Emergency medications and supplies.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const ensureLocations = async (): Promise<StorageLocation[]> => {
  const existing = await locationRepository.list();
  if (existing.length > 0) {
    return existing;
  }
  await locationRepository.saveAll(defaultLocations);
  return defaultLocations;
};

export const medicineService = {
  async listMedicines(): Promise<Medicine[]> {
    await ensureLocations();
    return medicineRepository.list();
  },
  async listLocations(): Promise<StorageLocation[]> {
    return ensureLocations();
  },
  async addLocation(name: string, description?: string): Promise<StorageLocation> {
    const existing = await ensureLocations();
    const now = new Date().toISOString();
    const location: StorageLocation = {
      id: createId(),
      name,
      description,
      createdAt: now,
      updatedAt: now,
    };
    const updated = [...existing, location];
    await locationRepository.saveAll(updated);
    return location;
  },
  async addMedicine(input: {
    name: string;
    expiryDate: string;
    quantity: number;
    locationId: string;
    tags: MedicineTag[];
    scannedCode?: string;
  }): Promise<Medicine> {
    const now = new Date().toISOString();
    const medicine: Medicine = {
      id: createId(),
      name: input.name,
      expiryDate: input.expiryDate,
      quantity: input.quantity,
      locationId: input.locationId,
      tags: input.tags,
      scannedCode: input.scannedCode,
      createdAt: now,
      updatedAt: now,
    };
    const existing = await medicineRepository.list();
    const updated = [medicine, ...existing];
    await medicineRepository.saveAll(updated);
    return medicine;
  },
  async updateMedicine(updatedMedicine: Medicine): Promise<void> {
    const medicines = await medicineRepository.list();
    const updated = medicines.map((medicine) =>
      medicine.id === updatedMedicine.id
        ? { ...updatedMedicine, updatedAt: new Date().toISOString() }
        : medicine
    );
    await medicineRepository.saveAll(updated);
  },
  async searchMedicines(query: string): Promise<Medicine[]> {
    const medicines = await medicineRepository.list();
    if (!query.trim()) {
      return medicines;
    }
    const normalized = query.trim().toLowerCase();
    return medicines.filter((medicine) => {
      const nameMatch = medicine.name.toLowerCase().includes(normalized);
      const tagMatch = medicine.tags.some((tag) =>
        tag.label.toLowerCase().includes(normalized)
      );
      return nameMatch || tagMatch;
    });
  },
  async filterByTag(tagLabel: string): Promise<Medicine[]> {
    const medicines = await medicineRepository.list();
    const normalized = tagLabel.trim().toLowerCase();
    return medicines.filter((medicine) =>
      medicine.tags.some((tag) => tag.label.toLowerCase() === normalized)
    );
  },
  async listTags(): Promise<MedicineTag[]> {
    const medicines = await medicineRepository.list();
    const tagMap = new Map<string, MedicineTag>();
    medicines.forEach((medicine) => {
      medicine.tags.forEach((tag) => {
        tagMap.set(tag.label.toLowerCase(), tag);
      });
    });
    return Array.from(tagMap.values());
  },
};
