import React, { useState } from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme";

type DrawerParamList = { Home: undefined; Profile: undefined; Settings: undefined };
const Drawer = createDrawerNavigator<DrawerParamList>();

function HomeScreen() {
  return (
    <View style={s.center}>
      <Text style={s.big}>Xin chào 👋</Text>
    </View>
  );
}

function ProfileScreen() {
  return (
    <View style={s.center}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>NA</Text>
      </View>
      <Text style={s.big}>Nguyễn Văn An</Text>
      <Text style={s.muted}>an.nguyen@example.com</Text>
    </View>
  );
}

// TODO 1: Màn hình Settings với Switch
function SettingsScreen() {
  const [notify, setNotify] = useState(true);
  const [dark, setDark] = useState(false);

  return (
    <View style={[s.root, dark && { backgroundColor: "#1F2430" }]}>
      <View style={s.settingRow}>
        <Text style={[s.settingLabel, dark && { color: "#fff" }]}>Nhận thông báo</Text>
        <Switch value={notify} onValueChange={setNotify} />
      </View>

      <View style={s.settingRow}>
        <Text style={[s.settingLabel, dark && { color: "#fff" }]}>Giao diện tối</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>

      <Text style={[s.statusText, dark && { color: "#ccc" }]}>
        Thông báo: {notify ? "BẬT" : "TẮT"} · Giao diện: {dark ? "Tối" : "Sáng"}
      </Text>
    </View>
  );
}

// TODO 2: DrawerApp chính
export function DrawerApp() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={({ route }) => ({
          drawerActiveTintColor: colors.red,
          drawerInactiveTintColor: colors.text,
          drawerIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "home-outline";
            if (route.name === "Home") iconName = "home-outline";
            else if (route.name === "Profile") iconName = "person-outline";
            else if (route.name === "Settings") iconName = "settings-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Drawer.Screen name="Home" component={HomeScreen} options={{ title: "Trang chủ" }} />
        <Drawer.Screen name="Profile" component={ProfileScreen} options={{ title: "Hồ sơ cá nhân" }} />
        <Drawer.Screen name="Settings" component={SettingsScreen} options={{ title: "Cài đặt" }} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  big: { fontSize: 20, fontWeight: "bold", color: colors.text, marginTop: 10 },
  muted: { fontSize: 14, color: colors.muted, marginTop: 4 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.line,
  },
  settingLabel: { fontSize: 16, color: colors.text },
  statusText: { marginTop: 24, fontSize: 14, color: colors.muted, textAlign: "center" },
});