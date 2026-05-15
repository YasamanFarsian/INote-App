import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import { Colors } from "../../constants/theme";

type Note = {
  id: string;
  text: string;
};

export default function AddListScreen() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  // LOAD
  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    const saved = await AsyncStorage.getItem("notes");
    if (saved) setNotes(JSON.parse(saved));
  }

  // SAVE (whenever notes change)
  useEffect(() => {
    AsyncStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  function addNote() {
    if (!text.trim()) return;

    const newNotes = [{ id: Date.now().toString(), text }, ...notes];

    setNotes(newNotes);
    setText("");
  }

  return (
    <View
      style={{ flex: 1, padding: 20, backgroundColor: Colors.light.background }}
    >
      {/* INPUT */}
      <TextInput
        placeholder="Write a note..."
        placeholderTextColor={Colors.light.icon}
        value={text}
        onChangeText={setText}
        style={{
          backgroundColor: "#fff",
          padding: 14,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: "#E5E5E5",
          fontSize: 16,
          color: Colors.light.text,
        }}
      />

      {/* BUTTON */}
      <Pressable
        onPress={addNote}
        style={({ pressed }) => ({
          marginTop: 16,
          backgroundColor: pressed ? "#333" : "#000",
          padding: 16,
          borderRadius: 14,
          alignItems: "center",
        })}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>Make a List</Text>
      </Pressable>

      <Text style={{ marginTop: 20 }}>Notes count: {notes.length}</Text>

      {/* LIST */}
      <DraggableFlatList
        data={notes}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => setNotes(data)}
        renderItem={({ item, drag, isActive }) => (
          <Pressable onLongPress={drag}>
            <View
              style={{
                padding: 16,
                backgroundColor: isActive ? "#f2f2f2" : "#fff",
                borderRadius: 12,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: "#E5E5E5",
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
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
