import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StorageLocation } from "../models/Location";
import { Picker } from "@react-native-picker/picker";

type Props = {
  locations: StorageLocation[];
  selectedId: string;
  onChange: (value: string) => void;
};

export default function LocationPicker({ locations, selectedId, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Storage location</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={selectedId} onValueChange={onChange}>
          {locations.map((location) => (
            <Picker.Item
              key={location.id}
              label={location.name}
              value={location.id}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontWeight: "600",
    marginBottom: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    overflow: "hidden",
  },
});
