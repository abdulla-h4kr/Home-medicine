import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
} from "react-native";
import MedicineCard from "../components/MedicineCard";
import { Medicine } from "../models/Medicine";
import { StorageLocation } from "../models/Location";
import { medicineService } from "../services/medicineService";

export default function MedicineListScreen() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [locations, setLocations] = useState<StorageLocation[]>([]);
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const loadData = async () => {
    const [meds, locs] = await Promise.all([
      medicineService.listMedicines(),
      medicineService.listLocations(),
    ]);
    setMedicines(meds);
    setLocations(locs);
    const storedTags = await medicineService.listTags();
    setTags(storedTags.map((tag) => tag.label));
  };

  useEffect(() => {
    void loadData();
  }, []);

  const filtered = useMemo(() => {
    let result = medicines;
    if (query.trim()) {
      const normalized = query.trim().toLowerCase();
      result = result.filter((medicine) => {
        const nameMatch = medicine.name.toLowerCase().includes(normalized);
        const tagMatch = medicine.tags.some((tag) =>
          tag.label.toLowerCase().includes(normalized)
        );
        return nameMatch || tagMatch;
      });
    }
    if (selectedTag) {
      result = result.filter((medicine) =>
        medicine.tags.some(
          (tag) => tag.label.toLowerCase() === selectedTag.toLowerCase()
        )
      );
    }
    return result;
  }, [medicines, query, selectedTag]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Medicines</Text>
      <TextInput
        placeholder="Search by name or tag"
        style={styles.search}
        value={query}
        onChangeText={setQuery}
      />
      <View style={styles.tagRow}>
        <Pressable
          style={[styles.tagChip, !selectedTag && styles.tagChipActive]}
          onPress={() => setSelectedTag(null)}
        >
          <Text
            style={[styles.tagChipText, !selectedTag && styles.tagChipTextActive]}
          >
            All
          </Text>
        </Pressable>
        {tags.map((tag) => (
          <Pressable
            key={tag}
            style={[
              styles.tagChip,
              selectedTag === tag && styles.tagChipActive,
            ]}
            onPress={() => setSelectedTag(tag)}
          >
            <Text
              style={[
                styles.tagChipText,
                selectedTag === tag && styles.tagChipTextActive,
              ]}
            >
              {tag}
            </Text>
          </Pressable>
        ))}
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MedicineCard
            medicine={item}
            location={locations.find((location) => location.id === item.locationId)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No medicines found. Add some!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8fafc",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 12,
  },
  search: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    marginBottom: 12,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  tagChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#e2e8f0",
    marginRight: 8,
    marginBottom: 8,
  },
  tagChipActive: {
    backgroundColor: "#0f172a",
  },
  tagChipText: {
    color: "#111827",
    fontSize: 12,
  },
  tagChipTextActive: {
    color: "#fff",
  },
  empty: {
    textAlign: "center",
    color: "#6b7280",
    marginTop: 48,
  },
});
