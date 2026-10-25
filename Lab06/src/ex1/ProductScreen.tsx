import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SelectPhoneParamList } from "./SelectPhoneApp";
import { Phone } from "../types";
import { PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";
import { Stars } from "../components/Stars";

type Props = NativeStackScreenProps<SelectPhoneParamList, "Product"> & {
  phone: Phone;
};

export function ProductScreen({ navigation, route, phone }: Props) {
  const picked = route.params?.color;
  const shown = picked ?? phone.defaultColor;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.imageWrap}>
        <Image
          source={PHONE_COLORS[shown].image}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{phone.name}</Text>
        <View style={styles.row}>
          <Stars value={phone.rating} />
          <Text style={styles.review}>(Xem {phone.reviewCount} đánh giá)</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.price}>{formatPrice(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatPrice(phone.oldPrice)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.badge}>{phone.badge}</Text>
          <View style={styles.questionCircle}>
            <Text style={styles.questionText}>?</Text>
          </View>
        </View>

        <Pressable
          style={styles.chooseBtn}
          onPress={() => navigation.navigate("ChooseColor", { color: picked })}
        >
          <Text style={styles.chooseBtnText}>
            {picked ? "4 MÀU-CHỌN LOẠI" : "4 MÀU-CHỌN MÀU"}
          </Text>
          <Text style={styles.arrowIcon}>&gt;</Text>
        </Pressable>
      </View>

      <Pressable style={styles.buyBtn} onPress={() => alert("Đã thêm vào giỏ hàng!")}>
        <Text style={styles.buyBtnText}>CHỌN MUA</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16, paddingBottom: 16 },
  imageWrap: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 10 },
  image: { width: "100%", height: "90%" },
  info: { gap: 8 },
  name: { fontSize: 16, fontWeight: "600", color: colors.text },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  review: { color: colors.muted, fontSize: 13 },
  price: { fontSize: 18, fontWeight: "bold", color: colors.red },
  oldPrice: { fontSize: 14, color: colors.muted, textDecorationLine: "line-through" },
  badge: { color: colors.red, fontWeight: "700", fontSize: 12 },
  questionCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.muted,
    alignItems: "center",
    justifyContent: "center",
  },
  questionText: { fontSize: 10, color: colors.muted, fontWeight: "bold" },
  chooseBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: 6,
    paddingVertical: 12,
    marginTop: 10,
    position: "relative",
  },
  chooseBtnText: { fontWeight: "bold", fontSize: 14, color: colors.text },
  arrowIcon: { position: "absolute", right: 14, fontSize: 16, fontWeight: "bold", color: colors.text },
  buyBtn: {
    backgroundColor: colors.red,
    borderRadius: 6,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  buyBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});