from pydantic import BaseModel

class Expense(BaseModel):
    date: str | None = None
    amount: int
    category: str
    description: str
    party: str

class Debt(Expense):
    due_date: str
    interest: float
    owe: bool
