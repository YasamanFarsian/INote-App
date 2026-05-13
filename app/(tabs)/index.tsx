import { router } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Colors } from "../../constants/theme";

export default function Index() {
  useEffect(() => {
    setTimeout(() => {
      router.replace("/notes");
    }, 3000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.light.background,
      }}
    >
      <Text
        style={{
          fontSize: 40,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        iNote
      </Text>

      <ActivityIndicator size="large" />
    </View>
  );
}
