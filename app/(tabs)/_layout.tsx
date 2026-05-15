import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Tabs } from "expo-router";
import React from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      {/* Visible tabs */}

      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="house.fill" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={26} name="gearshape.fill" color={color} />
          ),
        }}
      />

      {/* Hidden screens */}

      <Tabs.Screen
        name="notesScreens"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="addNoteScreesn"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="listScrseen"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="addListsScreen"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
