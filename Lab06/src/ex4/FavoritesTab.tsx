import React from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { TabProps } from "./types";
import { PHONES } from "../data/phones";
import { useFavorites } from "./FavoritesContext";
import { colors, formatPrice } from "../theme";

export function FavoritesTab({ navigation }: TabProps<"Favorites">) {
  const { ids } = useFavorites();
  const favPhones = PHONES.filter((p) => ids.includes(p.id));

  if (favPhones.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={{ color: colors.muted }}>Chưa có sản phẩm nào được lưu.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={favPhones}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      renderItem={({ item }) => (
        <Pressable
          style={styles.card}
          onPress={() => navigation.navigate("ProductDetails", { id: item.id })}
        >
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{formatPrice(item.price)}</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  card: { padding: 16, backgroundColor: "#fff", borderRadius: 8, elevation: 1 },
  name: { fontSize: 15, fontWeight: "600", color: colors.text },
  price: { fontSize: 14, color: colors.red, fontWeight: "bold", marginTop: 4 },
});