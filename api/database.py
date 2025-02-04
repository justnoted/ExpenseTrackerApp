import os
import pymongo
from bson import ObjectId
from dotenv import load_dotenv

load_dotenv()
client = pymongo.MongoClient(os.getenv("MONGO_URI"))
db = client["ExpenseTrackerAPI"]

expenses = db.get_collection("expenses")
debts = db.get_collection("debts")

def get_all_expenses():
    return [convert_id_to_str(expense) for expense in list(expenses.find())]

def get_expense_with_id(expense_id):
    doc = expenses.find_one({"_id": ObjectId(expense_id)})
    return None if not doc else convert_id_to_str(doc)

def create_expense(expense):
    exp = expense.model_dump()
    result = expenses.insert_one(exp)

    return result.inserted_id if result.inserted_id else None

def update_expense(expense_id, expense):
    exp = expense.model_dump()
    result = expenses.find_one_and_update({"_id": ObjectId(expense_id)}, {"$set": exp})
    print(result)
    return result

def delete_expense(expense_id):
    result = expenses.find_one_and_delete({"_id": ObjectId(expense_id)})
    return result

def convert_id_to_str(item):
    item['_id'] = str(item['_id'])
    return item

# Debts

def get_all_debts():
    return list(debts.find())
