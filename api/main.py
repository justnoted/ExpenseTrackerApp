from fastapi import FastAPI
import database as db

app = FastAPI()     # Run "fastapi run main.py" to use with Expenses App

@app.get('/')
def index():
    return {"status": "what?"}

@app.get('/expenses')
def get_all_expenses():
    return db.get_items(db.get_all_expenses())

@app.get('/debts')
def get_all_expenses():
    debts = db.get_all_debts()
    for debt in debts:
        debt['_id'] = str(debt['_id'])

    return debts
