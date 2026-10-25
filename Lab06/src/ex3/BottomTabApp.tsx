import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { PHONES } from "../data/phones";
import { colors, formatPrice } from "../theme";

type TabParamList = { Home: undefined; Search: undefined; Profile: undefined };
const Tab = createBottomTabNavigator<TabParamList>();

const ICONS: Record<keyof TabParamList, [keyof typeof Ionicons.glyphMap, keyof typeof Ionicons.glyphMap]> = {
  Home: ["home", "home-outline"],
  Search: ["search", "search-outline"],
  Profile: ["person", "person-outline"],
};

function HomeTab() {
  return (
    <FlatList
      data={PHONES}
      keyExtractor={(p) => p.id}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      renderItem={({ item }) => (
        <View style={s.card}>
          <Text style={s.cardTitle}>{item.name.split(" - ")[0]}</Text>
          <Text style={s.cardPrice}>{formatPrice(item.price)}</Text>
        </View>
      )}
    />
  );
}

function SearchTab() {
  const [keyword, setKeyword] = useState("");
  const filtered = PHONES.filter((p) =>
    p.name.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        value={keyword}
        onChangeText={setKeyword}
        placeholder="Nhập từ khóa tìm kiếm..."
        style={s.input}
      />
      {filtered.length === 0 ? (
        <View style={s.center}>
          <Text style={{ color: colors.muted }}>Không có kết quả cho “{keyword}”</Text>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(p) => p.id}
          contentContainerStyle={{ gap: 10, marginTop: 12 }}
          renderItem={({ item }) => (
            <View style={s.card}>
              <Text style={s.cardTitle}>{item.name}</Text>
              <Text style={s.cardPrice}>{formatPrice(item.price)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

function ProfileTab() {
  return (
    <View style={s.center}>
      <View style={s.avatar}>
        <Text style={s.avatarText}>M</Text>
      </View>
      <Text style={s.name}>Nguyễn Ngô Đức Mạnh</Text>
      <Text style={s.email}>manh@example.com</Text>
    </View>
  );
}

export function BottomTabApp() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: colors.red,
          tabBarInactiveTintColor: colors.muted,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={ICONS[route.name][focused ? 0 : 1]}
              size={size}
              color={color}
            />
          ),
        })}
      >
        <Tab.Screen name="Home" component={HomeTab} options={{ title: "Trang chủ" }} />
        <Tab.Screen name="Search" component={SearchTab} options={{ title: "Tìm kiếm" }} />
        <Tab.Screen name="Profile" component={ProfileTab} options={{ title: "Cá nhân" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const s = StyleSheet.create({
  card: { padding: 16, backgroundColor: "#fff", borderRadius: 8, elevation: 1 },
  cardTitle: { fontSize: 15, fontWeight: "600", color: colors.text },
  cardPrice: { fontSize: 14, color: colors.red, fontWeight: "bold", marginTop: 4 },
  input: {
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  avatarText: { fontSize: 36, color: "#fff", fontWeight: "bold" },
  name: { fontSize: 18, fontWeight: "bold", color: colors.text },
  email: { fontSize: 14, color: colors.muted, marginTop: 4 },
});