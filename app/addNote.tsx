import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { Colors } from "../constants/theme";
type Note = {
  id: string;
  text: string;
};

export default function AddNoteScreen() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  function addNote() {
    if (!text.trim()) return;

    setNotes([...notes, { id: Date.now().toString(), text }]);
    setText("");
  }
  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    const saved = await AsyncStorage.getItem("notes");
    if (saved) setNotes(JSON.parse(saved));
  }
  useEffect(() => {
    AsyncStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Write a note..."
        placeholderTextColor={Colors.light.icon}
        value={text}
        onChangeText={setText}
        style={{
          backgroundColor: Colors.light.background,
          padding: 14,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: "#E5E5E5",
          fontSize: 16,
          color: Colors.light.text,
        }}
      />

      <Pressable
        onPress={addNote}
        style={({ pressed }) => ({
          marginTop: 16,
          backgroundColor: pressed ? "#333" : Colors.light.text,
          padding: 16,
          borderRadius: 14,
          alignItems: "center",
        })}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>Add Note</Text>
      </Pressable>

      <Text style={{ marginTop: 20 }}>Notes count: {notes.length}</Text>

      <DraggableFlatList
        data={notes}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => setNotes(data)}
        renderItem={({ item, drag, isActive }) => (
          <Pressable onLongPress={drag}>
            <View
              style={{
                padding: 16,
                backgroundColor: "#fff",
                borderRadius: 12,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: "#E5E5E5",

                // iOS shadow
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },

                // Android shadow
                elevation: 2,
              }}
            >
              <Text style={{ fontSize: 16, color: "#111" }}>{item.text}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
