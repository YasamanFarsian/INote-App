import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { Colors } from "../../constants/theme";

type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
};

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    const saved = await AsyncStorage.getItem("notes");
    if (saved) setNotes(JSON.parse(saved));
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.light.background }}>
      {/* HEADER */}
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          padding: 20,
          color: Colors.light.text,
        }}
      >
        iNote
      </Text>

      {/* GRID LIST */}
      <FlatList
        data={notes}
        numColumns={2}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item }) => (
          <Pressable
            style={{
              flex: 1,
              backgroundColor: "#fff",
              margin: 6,
              padding: 14,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: "#eee",
              minHeight: 120,
            }}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/addNoteScreen",
                params: { id: item.id },
              })
            }
          >
            <View>
              {/* TITLE */}
              <Text
                numberOfLines={2}
                style={{
                  fontSize: 14,
                  fontWeight: "600",
                  marginBottom: 6,
                }}
              >
                {item.title || "Untitled"}
              </Text>

              {/* DATE */}
              <Text style={{ fontSize: 11, color: "#888" }}>
                {item.updatedAt}
              </Text>
            </View>
          </Pressable>
        )}
      />

      {/* FLOATING + BUTTON */}
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/(tabs)/addNoteScreen",
          })
        }
        style={{
          position: "absolute",
          right: 20,
          bottom: 30,
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: "#000",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </Pressable>
    </View>
  );
}
