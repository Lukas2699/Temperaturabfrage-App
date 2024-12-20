from fastapi import FastAPI
import pandas as pd


### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

@app.get("/api/py/helloFastApi")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}

DATA_FILE = "C:\Users\Lukas\Desktop\WID Projekt\meteodaten_2023_daily.csv"
data = pd.read_csv(DATA_FILE)

@app.get("/api/py/weather/locations")
def get_locations():
    locations = data["Standortname"].unique()
    return {"locations": locations.tolist()}

@app.get("/api/py/weather/date-range")
def get_date_range():
    min_date = data["Datum"].min()
    max_date = data["Datum"].max()
    return {"min_date": min_date, "max_date": max_date}

@app.get("/api/py/weather/metrics")
def get_metrics():
    metrics = [
        {"key": "T", "label": "Durchschnittstemperatur (T)"},
        {"key": "T_max", "label": "Höchsttemperatur (T_max)"}
    ]
    return {"metrics": metrics}
