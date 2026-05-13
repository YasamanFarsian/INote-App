import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Colors } from "../../constants/theme";

export default function NotesScreen() {
  return (
    <View
      style={{ flex: 1, padding: 20, backgroundColor: Colors.light.background }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
          color: Colors.light.text,
        }}
      >
        My Notes
      </Text>

      <View
        style={{
          padding: 16,
          backgroundColor: "#fff",
          borderRadius: 12,
          marginBottom: 10,
          borderWidth: 1,
          borderColor: "#E5E5E5",
        }}
      >
        <Text style={{ color: Colors.light.text }}>Example Note</Text>
      </View>

      <Pressable
        onPress={() => router.push("/(tabs)/addNote")}
        style={({ pressed }) => ({
          backgroundColor: pressed ? "#333" : "#000",
          padding: 15,
          borderRadius: 12,
          alignItems: "center",
          marginTop: 10,
        })}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>Add Note</Text>
      </Pressable>
    </View>
  );
}
