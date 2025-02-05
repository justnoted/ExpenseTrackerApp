import { useState, useEffect } from 'react';
import {TextInput, Pressable, StyleSheet, Text, View} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import Constants from "expo-constants";

export default function EditExpense() {
  const router = useRouter();
  const {id} = useLocalSearchParams();
  const [expense, setExpense] = useState(null)

  const [amount, setAmount] = useState(null);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [party, setParty] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const hostUri = Constants.expoConfig?.hostUri;
    const ipAddress = hostUri ? hostUri.split(":")[0] : null;
    const apiPort = "8000";
    const apiUrl2 = ipAddress ? `http://${ipAddress}:${apiPort}/expenses/${id}` : null;
    const apiUrl = `http://localhost:${apiPort}/expenses/${id}`;    // unable to access with hostUri

    if (!apiUrl) { return }

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setExpense(data))
      .catch(err => setError(err));
    }, []);

  if (!expense) { return <Text>Loading..</Text> }

  const parseAmountToString = (value: number) => {
    let amt = value / 100
    return amt.toString()
  }

  const parseAmountToInt = (value: string) => {
    let amt = value.replace(".", "")
    return parseInt(amt)
  }

  const addAndReturn = async () => {
    const newExpense = {
      amount: parseAmountToInt(amount),
      category: category,
      description: description,
      party: party
    }

    try {
      const response = await fetch(`http://localhost:8000/expenses/${expense['_id']}`, {
        method: 'PUT',
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
      setError("An error occurred while saving expense. Please try again later.")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>Edit Expense</Text>

      <Text style={styles.textLabel}>Enter new expense amount (in $):</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setAmount}
        defaultValue={parseAmountToString(expense['amount'])}
        value={amount}
        placeholder="ex. $12.99"
        keyboardType="numeric"
      />

      <Text style={styles.textLabel}>Enter new expense description:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setDescription}
        value={expense['description']}
        placeholder="ex. Gas"
      />

      <Text style={styles.textLabel}>Enter merchant/company:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setParty}
        value={expense['party']}
        placeholder="ex. Casey's"
      />

      <Text style={styles.textLabel}>Enter the expense's category:</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={setCategory}
        value={expense['category']}
        placeholder="ex. Travel"
      />

      <Pressable onPress={addAndReturn} style={styles.addButton}>
        <Text style={styles.addButtonText}>^ Edit Expense</Text>
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