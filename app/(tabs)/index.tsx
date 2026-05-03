import { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

type Note = {
  id: string;
  text: string;
};
export default function App() {
  const [text, setText] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);

  function addNote() {
    if (!text.trim()) return;

    setNotes([...notes, { id: Date.now().toString(), text }]);
    setText('');
  }
useEffect(() => {
  loadNotes();
}, []);

async function loadNotes() {
  const saved = await AsyncStorage.getItem('notes');
  if (saved) setNotes(JSON.parse(saved));
}
useEffect(() => {
  AsyncStorage.setItem('notes', JSON.stringify(notes));
}, [notes]);


  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="Enter note"
        value={text}
        onChangeText={setText}
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 5,
        }}
      />

      <Button title="Add Note" onPress={addNote} />

      <Text style={{ marginTop: 20 }}>
        Notes count: {notes.length}
      </Text>

      <DraggableFlatList
        data={notes}
        keyExtractor={(item) => item.id}
        onDragEnd={({ data }) => setNotes(data)}
        renderItem={({ item, drag, isActive }) => (
          <Pressable onLongPress={drag}>
            <View
              style={{
                padding: 15,
                backgroundColor: isActive ? '#ddd' : '#fff',
                borderBottomWidth: 1,
              }}
            >
              <Text>{item.text}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}