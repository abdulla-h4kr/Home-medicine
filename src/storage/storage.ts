import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  async load<T>(key: string, fallback: T): Promise<T> {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  },
  async save<T>(key: string, value: T): Promise<void> {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
};
