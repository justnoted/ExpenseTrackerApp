import os
import pymongo
from dotenv import load_dotenv

load_dotenv()
client = pymongo.MongoClient(os.getenv("MONGO_URI"))
db = client["ExpenseTrackerAPI"]

expenses = db.get_collection("expenses")
debts = db.get_collection("debts")

def get_items(items):
    for item in items:
        item['_id'] = str(item['_id'])
    return items

def get_all_expenses():
    return list(expenses.find())

def get_all_debts():
    return list(debts.find())
