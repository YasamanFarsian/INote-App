import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { tintColorLight } from "../../constants/theme";

export default function Index() {
  useEffect(() => {
    setTimeout(() => {
      router.replace("/listScreen");
    }, 3000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: tintColorLight,
      }}
    >
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          marginBottom: 20,
          color: "#fff",
        }}
      >
        iNote
      </Text>

      <ActivityIndicator size="large" color="#ff7a00" />
    </View>
  );
}
