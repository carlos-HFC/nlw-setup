import { ActivityIndicator, StyleSheet, View } from "react-native";

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={100} color="#7C3AED" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#09090A"
  }
});