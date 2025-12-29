import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import { StorageLocation } from "../models/Location";
import { MedicineTag } from "../models/Medicine";
import { medicineService } from "../services/medicineService";
import TagInput from "../components/TagInput";
import { createId } from "../utils/id";

export default function AddMedicineScreen() {
  const [name, setName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [locations, setLocations] = useState<StorageLocation[]>([]);
  const [locationId, setLocationId] = useState("");
  const [tags, setTags] = useState<MedicineTag[]>([]);
  const [scannedCode, setScannedCode] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadLocations = async () => {
      const loaded = await medicineService.listLocations();
      setLocations(loaded);
      setLocationId(loaded[0]?.id ?? "");
    };
    void loadLocations();
  }, []);

  const save = async () => {
    if (!name.trim()) {
      Alert.alert("Missing name", "Please add a medicine name.");
      return;
    }
    if (!expiryDate.trim()) {
      Alert.alert("Missing expiry", "Please add an expiry date.");
      return;
    }
    if (!locationId) {
      Alert.alert("Missing location", "Please select a storage location.");
      return;
    }

    await medicineService.addMedicine({
      name: name.trim(),
      expiryDate: expiryDate.trim(),
      quantity: Number(quantity || "0"),
      locationId,
      tags,
      scannedCode,
    });

    setName("");
    setExpiryDate("");
    setQuantity("1");
    setTags([]);
    setScannedCode(undefined);
    Alert.alert("Saved", "Medicine added to your inventory.");
  };

  const simulateScan = () => {
    const sampleCode = `SCAN-${createId()}`;
    setScannedCode(sampleCode);
    setName("Ibuprofen 200mg");
    setExpiryDate("2026-05-31");
    setTags([
      { id: createId(), label: "painkiller" },
      { id: createId(), label: "anti-inflammatory" },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Add Medicine</Text>
      <View style={styles.section}>
        <Text style={styles.label}>Scan packaging</Text>
        <Text style={styles.helper}>
          Use barcode/QR or image recognition. Camera integration can be added
          later; a simulated scan is available for now.
        </Text>
        <Pressable style={styles.scanButton} onPress={simulateScan}>
          <Text style={styles.scanButtonText}>Simulate Scan</Text>
        </Pressable>
        {scannedCode ? (
          <Text style={styles.scanResult}>Scanned code: {scannedCode}</Text>
        ) : null}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Medicine name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Ibuprofen 200mg"
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Expiry date</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={expiryDate}
          onChangeText={setExpiryDate}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Quantity</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Storage location</Text>
        <View style={styles.locationRow}>
          {locations.map((location) => (
            <Pressable
              key={location.id}
              style={[
                styles.locationChip,
                locationId === location.id && styles.locationChipActive,
              ]}
              onPress={() => setLocationId(location.id)}
            >
              <Text
                style={[
                  styles.locationChipText,
                  locationId === location.id && styles.locationChipTextActive,
                ]}
              >
                {location.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <TagInput tags={tags} onChange={setTags} />
      </View>

      <Pressable style={styles.saveButton} onPress={save}>
        <Text style={styles.saveButtonText}>Save Medicine</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontWeight: "600",
    marginBottom: 8,
  },
  helper: {
    color: "#6b7280",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
  },
  scanButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  scanButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  scanResult: {
    marginTop: 8,
    color: "#1f2937",
  },
  locationRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  locationChip: {
    backgroundColor: "#e2e8f0",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  locationChipActive: {
    backgroundColor: "#0f172a",
  },
  locationChipText: {
    color: "#111827",
    fontSize: 12,
  },
  locationChipTextActive: {
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#16a34a",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
