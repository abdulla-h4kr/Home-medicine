export type MedicineTag = {
  id: string;
  label: string;
};

export type Medicine = {
  id: string;
  name: string;
  expiryDate: string;
  quantity: number;
  locationId: string;
  tags: MedicineTag[];
  createdAt: string;
  updatedAt: string;
  scannedCode?: string;
};
