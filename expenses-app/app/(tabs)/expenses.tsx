import { useState, useEffect } from "react";
import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import Constants from "expo-constants";
import { MenuProvider } from 'react-native-popup-menu';
import { Link } from "expo-router";
import ExpenseCard from "../../components/expenseCard"

export default function Expenses() {
  const [expenses, setExpenses] = useState(null);

  useEffect(() => {
    const hostUri = Constants.expoConfig?.hostUri;
    const ipAddress = hostUri ? hostUri.split(":")[0] : null;
    const apiPort = "8000";
    const apiUrl2 = ipAddress ? `http://${ipAddress}:${apiPort}/expenses` : null;
    const apiUrl = `http://localhost:${apiPort}/expenses`;    // unable to access with hostUri

    if (!apiUrl) { return }

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setExpenses(data))
      .catch(err => console.log(err));
    }, []);

  if (!expenses) { return <Text>Loading..</Text> }

  return (
    <MenuProvider>
    <View style={styles.container}>
      <Link href={`expenses/create`} style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Expense</Text>
      </Link>
        <FlatList
          data={expenses}
          renderItem={({item}) => <ExpenseCard expense={item} />}
          keyExtractor={(item) => item['_id']}
        />
    </View>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 18,
  },
  addButton: {
    width: "100%",
    padding: 8,
    textAlign: "center",
    backgroundColor: "#0cbc00",
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: "bold",
  }
});
