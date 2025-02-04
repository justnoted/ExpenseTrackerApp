from bson import ObjectId
from fastapi import FastAPI, HTTPException
from starlette import status
from datetime import datetime
import database as db
from models import *

app = FastAPI()     # Run "fastapi run main.py" to use with Expenses App

@app.get('/')
def index():
    return {"status": "hmm?"}

@app.get('/expenses')
def get_all_expenses():
    return db.get_all_expenses()

@app.get("/expenses/{expense_id}")
def get_expense_by_id(expense_id: str):
    if not ObjectId.is_valid(expense_id):
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Invalid ObjectId")

    expense = db.get_expense_with_id(expense_id)

    if not expense:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Expense not found")
    return expense

@app.post("/expenses", status_code=status.HTTP_201_CREATED)
def add_expense(expense: Expense):
    expense.date = datetime.now().isoformat()
    result = db.create_expense(expense)

    if not result:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Unable to create expense")

    return expense

@app.put("/expenses/{expense_id}")
def edit_expense(expense_id: str, expense: Expense):
    if not ObjectId.is_valid(expense_id):
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Invalid ObjectId")

    result = db.update_expense(expense_id, expense)

    if not result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No expense was found to update")

    return {"status": "Updated successfully"}

@app.delete("/expenses/{expense_id}")
def delete_expense(expense_id: str):
    if not ObjectId.is_valid(expense_id):
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail="Invalid ObjectId")

    result = db.delete_expense(expense_id)

    if not result:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No expense was found to delete")

    return {"status": "Deleted successfully"}


@app.get('/debts')
def get_all_debts():
    debts = db.get_all_debts()
    for debt in debts:
        debt['_id'] = str(debt['_id'])

    return debts
