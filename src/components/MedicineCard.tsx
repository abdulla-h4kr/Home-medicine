import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Medicine } from "../models/Medicine";
import { StorageLocation } from "../models/Location";

type Props = {
  medicine: Medicine;
  location?: StorageLocation;
};

export default function MedicineCard({ medicine, location }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{medicine.name}</Text>
      <Text style={styles.meta}>Expiry: {medicine.expiryDate}</Text>
      <Text style={styles.meta}>Quantity: {medicine.quantity}</Text>
      <Text style={styles.meta}>
        Location: {location ? location.name : "Unassigned"}
      </Text>
      <View style={styles.tagRow}>
        {medicine.tags.map((tag) => (
          <Text key={tag.id} style={styles.tag}>
            {tag.label}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  meta: {
    color: "#4b5563",
    marginBottom: 2,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  tag: {
    backgroundColor: "#e5f6ff",
    color: "#0369a1",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    marginRight: 6,
    marginBottom: 6,
    fontSize: 12,
  },
});
