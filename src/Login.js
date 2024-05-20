import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const [phonenumber, setPhonenumber] = useState("");
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState(null);
  const navigation = useNavigation();

  const signInwithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phonenumber);
      setConfirm(confirmation);
    } catch (error) {
      console.log("Error sending code: ", error);
    }
  };

  const confirmCode = async () => {
    try {
      const userCredentials = await confirm.confirm(code);
      const user = userCredentials.user;

      const userDocument = await firestore()
        .collection("users")
        .doc(user.uid)
        .get();

      if (userDocument.exists) {
        navigation.navigate("Dashbaord");
      } else {
        navigation.navigate("Details", { uid: user.uid });
      }
    } catch (error) {
      console.log("Invalid Code: ", error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "#ededed" }}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: 600,
          marginBottom: 40,
          marginTop: 150,
          color: "#c7ce5c",
        }}
      >
        Otp Verification App
      </Text>
      {!confirm ? (
        <>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 600,
              marginBottom: 10,
              //   marginTop: 150,
            }}
          >
            Enter your phone number
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
            value={phonenumber}
            placeholder="e.g., +91 7780290335"
            onChangeText={setPhonenumber}
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
            onPress={signInwithPhoneNumber}
          >
            <Text>Send Otp</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
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
            value={code}
            onChangeText={setCode}
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
            onPress={confirmCode}
          >
            <Text>Verify OTP</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
