from fastapi import FastAPI
import database as db

app = FastAPI()

@app.get('/')
def index():
    return {"status": "what?"}

@app.get('/expenses')
def get_all_expenses():
    expenses = db.get_all_expenses()        # May consider a better method to change ObjectId to str, IF needed
    for expense in expenses:
        expense['_id'] = str(expense['_id'])

    return expenses

@app.get('/debts')
def get_all_expenses():
    debts = db.get_all_debts()
    for debt in debts:
        debt['_id'] = str(debt['_id'])

    return debts
