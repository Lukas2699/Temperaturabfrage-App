from fastapi import FastAPI
import pandas as pd


app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

DATA_FILE =fastapi-vercel/pages/Data/meteodaten_2023_daily.csv
data = pd.read_csv(DATA_FILE, encoding="ISO-8859-1", delimiter=",", names=["Datum", "Standort", "Standortname", "WGS84_lat", "WGS84_lng", "RainDur", "StrGlo", "T", "T_max_h1", "p"], header=0)

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
