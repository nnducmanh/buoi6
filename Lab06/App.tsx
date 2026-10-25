import React from "react";
import { View, StyleSheet } from "react-native";
import { DrawerApp } from "./src/ex5/DrawerApp";

export default function App() {
  return (
    <View style={styles.container}>
      <DrawerApp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});