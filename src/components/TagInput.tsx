import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { MedicineTag } from "../models/Medicine";
import { createId } from "../utils/id";

type Props = {
  tags: MedicineTag[];
  onChange: (tags: MedicineTag[]) => void;
};

export default function TagInput({ tags, onChange }: Props) {
  const [value, setValue] = useState("");

  const addTag = () => {
    const label = value.trim();
    if (!label) {
      return;
    }
    if (tags.some((tag) => tag.label.toLowerCase() === label.toLowerCase())) {
      setValue("");
      return;
    }
    onChange([...tags, { id: createId(), label }]);
    setValue("");
  };

  const removeTag = (id: string) => {
    onChange(tags.filter((tag) => tag.id !== id));
  };

  return (
    <View>
      <Text style={styles.label}>Tags & categories</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="e.g., painkiller, allergy"
          value={value}
          onChangeText={setValue}
          onSubmitEditing={addTag}
        />
        <Pressable style={styles.addButton} onPress={addTag}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>
      <View style={styles.tagRow}>
        {tags.map((tag) => (
          <Pressable
            key={tag.id}
            onPress={() => removeTag(tag.id)}
            style={styles.tag}
          >
            <Text style={styles.tagText}>{tag.label} ✕</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    fontWeight: "600",
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  addButton: {
    backgroundColor: "#0f172a",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
    marginLeft: 8,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  tag: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 6,
    marginBottom: 6,
  },
  tagText: {
    color: "#111827",
    fontSize: 12,
  },
});
