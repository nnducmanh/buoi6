import React, { useState, useEffect, useCallback } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Pressable } from "react-native";
import { Phone } from "../types";
import { fetchPhone } from "../api/phoneApi";
import { SelectPhoneApp } from "./SelectPhoneApp";
import { colors } from "../theme";

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    setPhone(null);
    try {
      // Giả định lấy bản ghi id "1" trên MockAPI
      const data = await fetchPhone("1");
      setPhone(data);
    } catch (e: any) {
      setError(e.message ?? "Có lỗi xảy ra khi tải dữ liệu");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryBtn} onPress={load}>
          <Text style={styles.retryText}>THỬ LẠI</Text>
        </Pressable>
      </View>
    );
  }

  if (!phone) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.red} />
        <Text style={{ marginTop: 10, color: colors.muted }}>Đang tải...</Text>
      </View>
    );
  }

  return <SelectPhoneApp phone={phone} />;
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  errorText: { color: colors.red, fontSize: 16, textAlign: "center", marginBottom: 12 },
  retryBtn: { backgroundColor: colors.blue, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 6 },
  retryText: { color: "#fff", fontWeight: "bold" },
});