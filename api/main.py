from fastapi import FastAPI

app = FastAPI()

@app.get('/')
def index():
    return {"status": "what?"}

@app.get('/seed')
def seed_data():
    return {"status": "Database successfully seeded."}