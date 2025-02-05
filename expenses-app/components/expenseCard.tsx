import {Text, View, StyleSheet, Pressable, ListRenderItemInfo} from "react-native";
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useRouter } from "expo-router";

interface Expense {
  id: string;
  date: string;
  amount: number
  category: string
  description: string
  party: string
}

interface ExpenseCardProps {
  expense: Expense;
}

export default function ExpenseItem({expense}: ExpenseCardProps) {
  const router = useRouter();

  const deleteExpense = async (expense_id: string) => {
    try {
      const response = await fetch(`http://localhost:8000/expenses/${expense_id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error(response.json());
        return
      }

      router.push("/expenses");
    }

    catch (error) {
      console.error(error);
      return;
    }
  }

  const convertCentsToString = (value: number) => { return `\$${(value / 100).toString()}` }

  const convertDateToString = (iso: string) => {
    const date = new Date(iso);
    const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    const timeStr = date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
    return `${dateStr} * ${timeStr}`;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.category}>{expense.category}</Text>
        <Text style={styles.boldText}>{expense.description}</Text>
        <Text>{expense.party}</Text>
      </View>

      <View style={{alignItems: "flex-end"}}>
        <Menu style={{width: "25%", alignItems: "flex-end"}}>
          <MenuTrigger children={<SimpleLineIcons name="options" size={24} color="black"/>}/>
          <MenuOptions>
            <MenuOption onSelect={() => router.push(`/expenses/${expense['_id']}`)} text='Edit'/>
            <MenuOption onSelect={() => deleteExpense(expense['_id'])} text='Delete'/>
          </MenuOptions>
        </Menu>
        <Text style={styles.boldText}>{convertCentsToString(expense.amount)}</Text>
        <Text>{convertDateToString(expense.date)}</Text>
      </View>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    marginVertical: 7,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#e3e3e3"
  },
  category: {
    width: "100%",
    textAlign: "center",
    borderRadius: 5,
    padding: 2,
    backgroundColor: "white",
  },
  boldText: {
    fontSize: 18,
    fontWeight: "bold",
  }
})