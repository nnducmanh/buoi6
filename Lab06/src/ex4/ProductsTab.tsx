import React from "react";
import { FlatList, View, Text, Pressable, StyleSheet } from "react-native";
import { TabProps } from "./types";
import { PHONES } from "../data/phones";
import { colors, formatPrice } from "../theme";

export function ProductsTab({ navigation }: TabProps<"Products">) {
  return (
    <FlatList
      data={PHONES}
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
  card: { padding: 16, backgroundColor: "#fff", borderRadius: 8, elevation: 1 },
  name: { fontSize: 15, fontWeight: "600", color: colors.text },
  price: { fontSize: 14, color: colors.red, fontWeight: "bold", marginTop: 4 },
});