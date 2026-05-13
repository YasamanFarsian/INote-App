import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Colors } from "../constants/theme";

export default function NotesScreen() {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        My Notes
      </Text>

      <View
        style={{
          padding: 20,
          backgroundColor: Colors.light.background,
          borderRadius: 10,
          marginBottom: 10,
        }}
      >
        <Text>Example Note</Text>
      </View>

      <Pressable
        onPress={() => router.push("/addNote")}
        style={({ pressed }) => ({
          backgroundColor: pressed ? "#333" : "black",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 10,
        })}
      >
        <Text style={{ color: "white" }}>Add Note</Text>
      </Pressable>
    </View>
  );
}
