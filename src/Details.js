import React, { useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { View, Text, TextInput, TouchableOpacity } from "react-native";

export default function Details({ route, navigation }) {
  const { uid } = route.params;
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");

  const saveDetails = async () => {
    try {
      await firestore().collection("users").set({
        name,
        dob,
        email,
      });
      navigation.navigate("Dashboard");
    } catch (error) {
      console.log("Error in saving Data: ", error);
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
        Enter Your Details
      </Text>
      <TextInput
        style={{
          height: 50,
          marginBottom: 30,
          borderColor: "#000",
          borderWidth: 1,
          width: "100%",
          paddingHorizontal: 10,
          borderRadius: 10,
        }}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={{
          height: 50,
          marginBottom: 30,
          borderColor: "#000",
          borderWidth: 1,
          width: "100%",
          paddingHorizontal: 10,
          borderRadius: 10,
        }}
        placeholder="Date of Birth"
        value={dob}
        onChangeText={setDob}
      />
      <TextInput
        style={{
          height: 50,
          marginBottom: 30,
          borderColor: "#000",
          borderWidth: 1,
          width: "100%",
          paddingHorizontal: 10,
          borderRadius: 10,
        }}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity
        style={{
          // width: "80%",
          backgroundColor: "#c7ce5c",
          color: "#ffff",
          padding: 16,
          alignItems: "center",
          borderRadius: 10,
        }}
        onPress={saveDetails}
      >
        <Text>Save Your Details</Text>
      </TouchableOpacity>
    </View>
  );
}
