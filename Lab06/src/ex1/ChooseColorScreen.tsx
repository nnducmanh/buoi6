import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SelectPhoneParamList } from "./SelectPhoneApp";
import { ColorKey, Phone } from "../types";
import { COLOR_ORDER, PHONE_COLORS } from "../data/phones";
import { colors, formatPrice } from "../theme";

type Props = NativeStackScreenProps<SelectPhoneParamList, "ChooseColor"> & {
  phone: Phone;
};

export function ChooseColorScreen({ navigation, route, phone }: Props) {
  const [picked, setPicked] = useState<ColorKey | undefined>(route.params?.color);
  const [line1, line2] = phone.name.split(" - ");

  return (
    <SafeAreaView style={styles.root}>

      <View style={styles.header}>
        <Image
          source={PHONE_COLORS[picked ?? phone.defaultColor].image}
          style={styles.thumb}
          resizeMode="contain"
        />
        <View style={styles.headerText}>
          <Text style={styles.small}>{line1}</Text>
          {line2 && <Text style={styles.small}>{line2}</Text>}

          {picked && (
            <View style={{ marginTop: 6, gap: 4 }}>
              <Text style={styles.small}>
                Màu: <Text style={styles.bold}>{PHONE_COLORS[picked].label}</Text>
              </Text>
              <Text style={styles.small}>
                Cung cấp bởi <Text style={styles.bold}>{phone.supplier}</Text>
              </Text>
              <Text style={styles.boldPrice}>{formatPrice(phone.price)}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.hint}>Chọn một màu bên dưới:</Text>
        <View style={styles.swatches}>
          {COLOR_ORDER.map((key) => (
            <Pressable
              key={key}
              onPress={() => setPicked(key)}
              style={[
                styles.swatch,
                { backgroundColor: PHONE_COLORS[key].hex },
                picked === key && styles.swatchOn,
              ]}
            />
          ))}
        </View>

        <Pressable
          style={styles.doneBtn}
          onPress={() => navigation.navigate("Product", { color: picked })}
        >
          <Text style={styles.doneBtnText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", padding: 16, backgroundColor: "#fff", gap: 12 },
  thumb: { width: 100, height: 115 },
  headerText: { flex: 1, justifyContent: "center" },
  small: { fontSize: 13, color: colors.text },
  bold: { fontWeight: "bold" },
  boldPrice: { fontSize: 16, fontWeight: "bold", color: colors.text, marginTop: 2 },
  body: { flex: 1, backgroundColor: colors.grey, padding: 16, justifyContent: "space-between" },
  hint: { fontSize: 16, fontWeight: "500", color: colors.text, marginBottom: 12 },
  swatches: { alignItems: "center", gap: 12 },
  swatch: { width: 85, height: 80, borderRadius: 2 },
  swatchOn: { borderWidth: 3, borderColor: colors.red },
  doneBtn: {
    backgroundColor: colors.blue,
    borderRadius: 4,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 8,
  },
  doneBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});