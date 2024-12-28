from fastapi import FastAPI, Query, HTTPException
import pandas as pd


app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

DATA_FILE = "pages/Data/meteodaten_2023_daily.csv"
data = pd.read_csv(DATA_FILE, encoding="utf-8", delimiter=",")

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
        {"key": "T_max_h1", "label": "Höchsttemperatur (T_max)"}
    ]
    return {"metrics": metrics}

@app.get("/api/py/weather/filter")
def filter_weather(
    location: str = Query(...),
    start_date: str = Query(...),
    end_date: str = Query(...),
    metric: str = Query(...)
):

    filtered_data = data[
        (data["Standortname"] == location) &
        (data["Datum"] >= start_date) &
        (data["Datum"] <= end_date)
    ]

    filtered_data = filtered_data.fillna(0)

    result = filtered_data[["Datum", metric]].to_dict(orient="records")
    return {"data": result}