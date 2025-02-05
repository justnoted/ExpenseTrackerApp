import { useState } from 'react';
import {TextInput, Pressable, StyleSheet, Text, View} from "react-native";
import { useRouter } from "expo-router";

export default function CreateExpense() {
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [party, setParty] = useState("");
  const [error, setError] = useState("");

  const parseAmount = (value: string) => {
    let amt = value.replace(".", "")
    return parseInt(amt)
  }

  const addAndReturn = async () => {
    const newExpense = {
      amount: parseAmount(amount),
      category: category,
      description: description,
      party: party
    }

    try {
      const response = await fetch('http://localhost:8000/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExpense)
      })

      if (!response.ok) {
        const errorData = await response.json();
        setError("Unable to save expense. Review your expense data.");
        console.error(errorData)
        return
      }

      setAmount("");
      setCategory("");
      setDescription("");
      setParty("");
      setError("");

      router.push('/expenses')
    } catch (error) {
      console.error(error)
      setError("An error occurred while creating expense. Please try again later.")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>Add New Expense</Text>

      <Text style={styles.textLabel}>Enter the expense amount (in $):</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setAmount}
        value={amount}
        placeholder="ex. $12.99"
        keyboardType="numeric"
      />

      <Text style={styles.textLabel}>Enter expense's description:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setDescription}
        value={description}
        placeholder="ex. Gas"
      />

      <Text style={styles.textLabel}>Enter merchant/company:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setParty}
        value={party}
        placeholder="ex. Casey's"
      />

      <Text style={styles.textLabel}>Enter the expense's category:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setCategory}
        value={category}
        placeholder="ex. Travel"
      />

      <Pressable onPress={addAndReturn} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Expense</Text>
      </Pressable>
      <Text style={{color: 'red'}}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
  },
  addButton: {
    width: "100%",
    padding: 8,
    backgroundColor: "#0cbc00",
    marginTop: 15,
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  boldText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textLabel: {
    fontSize: 15,
    marginTop: 5,
  },
  textInput: {
    width: "100%",
    padding: 8,
    borderWidth: 1,
    borderRadius: 8,
  }
});