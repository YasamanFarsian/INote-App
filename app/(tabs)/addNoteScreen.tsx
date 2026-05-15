import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, TextInput, View } from "react-native";
import { Colors } from "../../constants/theme";

type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
};

export default function AddNoteScreen() {
  const { id } = useLocalSearchParams(); // 👈 IMPORTANT

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [notes, setNotes] = useState<Note[]>([]);

  // LOAD ALL NOTES + FIND CURRENT NOTE
  useEffect(() => {
    loadNote();
  }, []);

  async function loadNote() {
    const saved = await AsyncStorage.getItem("notes");
    const parsed: Note[] = saved ? JSON.parse(saved) : [];

    setNotes(parsed);

    if (id) {
      const existing = parsed.find((n) => n.id === id);

      if (existing) {
        setTitle(existing.title);
        setContent(existing.content);
      }
    }
  }

  // SAVE (create OR update)
  async function saveNote() {
    let updatedNotes: Note[] = [];

    if (id) {
      // EDIT MODE
      updatedNotes = notes.map((n) =>
        n.id === id
          ? {
              ...n,
              title: title || "Untitled",
              content,
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : n,
      );
    } else {
      // CREATE MODE
      const newNote: Note = {
        id: Date.now().toString(),
        title: title || "Untitled",
        content,
        updatedAt: new Date().toISOString().split("T")[0],
      };

      updatedNotes = [newNote, ...notes];
    }

    await AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));

    Alert.alert("Saved", "Note saved successfully");

    router.back();
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.light.background }}>
      {/* TOP BAR */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 15,
          paddingTop: 50,
          backgroundColor: "#fff",
        }}
      >
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} />
        </Pressable>

        <Pressable onPress={saveNote}>
          <Ionicons name="checkmark-circle" size={28} />
        </Pressable>
      </View>

      {/* TITLE */}
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        style={{ padding: 20, fontSize: 20 }}
      />

      {/* CONTENT */}
      <TextInput
        value={content}
        onChangeText={setContent}
        placeholder="Write..."
        multiline
        style={{
          flex: 1,
          padding: 20,
          fontSize: 16,
          textAlignVertical: "top",
        }}
      />
    </View>
  );
}
