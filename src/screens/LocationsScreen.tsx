import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { StorageLocation } from "../models/Location";
import { medicineService } from "../services/medicineService";

export default function LocationsScreen() {
  const [locations, setLocations] = useState<StorageLocation[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const load = async () => {
    const items = await medicineService.listLocations();
    setLocations(items);
  };

  useEffect(() => {
    void load();
  }, []);

  const addLocation = async () => {
    if (!name.trim()) {
      Alert.alert("Missing name", "Please enter a location name.");
      return;
    }
    await medicineService.addLocation(name.trim(), description.trim() || undefined);
    setName("");
    setDescription("");
    await load();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Storage Locations</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Location name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Description (optional)"
          value={description}
          onChangeText={setDescription}
        />
        <Pressable style={styles.addButton} onPress={addLocation}>
          <Text style={styles.addButtonText}>Add Location</Text>
        </Pressable>
      </View>
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.name}</Text>
            {item.description ? (
              <Text style={styles.cardDescription}>{item.description}</Text>
            ) : null}
          </View>
        )}
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
  form: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fff",
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: "#0f172a",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  cardDescription: {
    color: "#4b5563",
  },
});
