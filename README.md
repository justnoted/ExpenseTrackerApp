# Expense Tracker App
An Expo app made to track your expenses and debts owed by communicating to a local Python API, stored in MongoDB.

**NOTE:** This app is still in development. Some features may not work as intended.

### Startup
First, run FastAPI to get the backend running in production. This may require the installation of FastAPI. [Read here](https://fastapi.tiangolo.com/tutorial/#install-fastapi). 
```
fastapi run api/main.py 
```

Second, you must have Expo installed to run the frontend. Once installed, run the following command:
```
cd '\expenses-app\'
npx expo start
```