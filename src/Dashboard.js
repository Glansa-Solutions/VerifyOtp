import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";

export default function Dashbaord() {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await auth().signOut();

      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.log("Error while logout: ", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "#ededed" }}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: 600,
          marginBottom: 40,
          marginTop: 150,
        }}
      >
       Welcome to Dashbaord
      </Text>
      <TouchableOpacity
        style={{
          // width: "80%",
          backgroundColor: "#c7ce5c",
          color: "#ffff",
          padding: 16,
          alignItems: "center",
          borderRadius: 10,
        }}
        onPress={handleLogout}
      >
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
