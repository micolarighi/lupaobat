import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Status",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "bar-chart" : "bar-chart"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="stok"
        options={{
          title: "Stok",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={
                focused
                  ? "file-tray-stacked-outline"
                  : "file-tray-stacked-outline"
              }
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="bantuan"
        options={{
          title: "Bantuan",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "help" : "help"} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
