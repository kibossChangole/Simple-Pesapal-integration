import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Picker,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  Linking,
} from "react-native";

export default function PesapalForm() {
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [transactionType, setTransactionType] = useState("deposit");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!amount || !phone || !email || !firstName || !lastName) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }
  
    setLoading(true);
  
    try {
      //connect pesapal API from my server configuration (1)
      const response = await fetch(" ", { 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, phone, email, firstName, lastName, transactionType }),
      });
  
      const data = await response.json();
      if (response.ok && data.data?.redirect_url) {
        Linking.openURL(data.data.redirect_url);
      } else {
        Alert.alert("Error", data.message || "Something went wrong.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to connect to the backend.");
    }
  
    setLoading(false);
  };

  return (
    <View style = {styles.content}>
      <View style={styles.container}>
        <Text style={styles.title}>Pesapal Payment</Text>

        <TextInput
          style={styles.input}
          placeholder="Amount in KES"
          keyboardType="numeric"
          value={amount}
          onChangeText={setAmount}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />

        <Picker
          selectedValue={transactionType}
          onValueChange={setTransactionType}
          style={styles.picker}
        >
          <Picker.Item label="Deposit" value="deposit" />
          <Picker.Item label="Withdraw" value="withdraw" />
        </Picker>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content:{
    backgroundColor:"ghostwhite",
    height:"100%",
    width:"100%",
  },

  container: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    margin: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
