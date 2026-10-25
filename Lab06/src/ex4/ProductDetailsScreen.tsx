import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { RootProps } from "./types";
import { PHONES, PHONE_COLORS } from "../data/phones";
import { useFavorites } from "./FavoritesContext";
import { Stars } from "../components/Stars";
import { colors, formatPrice } from "../theme";

export function ProductDetailsScreen({ route }: RootProps<"ProductDetails">) {
  const { id } = route.params;
  const { has, toggle } = useFavorites();
  const phone = PHONES.find((p) => p.id === id);

  if (!phone) {
    return (
      <View style={styles.center}>
        <Text>Không tìm thấy sản phẩm #{id}</Text>
      </View>
    );
  }

  const isFavorite = has(phone.id);

  return (
    <View style={styles.root}>
      <Image
        source={PHONE_COLORS[phone.defaultColor].image}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.name}>{phone.name}</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginVertical: 8 }}>
        <Stars value={phone.rating} />
        <Text style={{ color: colors.muted }}>({phone.reviewCount} đánh giá)</Text>
      </View>
      <Text style={styles.price}>{formatPrice(phone.price)}</Text>
      <Text style={styles.supplier}>Cung cấp bởi: {phone.supplier}</Text>

      <Pressable
        style={[styles.favBtn, isFavorite && { backgroundColor: "#FFEBEE" }]}
        onPress={() => toggle(phone.id)}
      >
        <Text style={[styles.favText, isFavorite && { color: colors.red }]}>
          {isFavorite ? "♥ Đã lưu vào yêu thích" : "♡ Lưu vào yêu thích"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff", padding: 20 },
  image: { width: "100%", height: 220, marginBottom: 16 },
  name: { fontSize: 18, fontWeight: "bold", color: colors.text },
  price: { fontSize: 20, fontWeight: "bold", color: colors.red, marginVertical: 6 },
  supplier: { fontSize: 14, color: colors.muted, marginBottom: 20 },
  favBtn: {
    borderWidth: 1,
    borderColor: colors.red,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  favText: { color: colors.red, fontWeight: "bold", fontSize: 16 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});