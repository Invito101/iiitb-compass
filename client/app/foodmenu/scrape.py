import pandas as pd
import numpy as np
import datetime
import json
import hashlib

ALLDAYS = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]

if __name__ == "__main__":
    # 1) Load the CSV (dates like "14-Apr-25")
    df = pd.read_csv("menu.csv", encoding="latin1")

    # 2) Identify the column that holds session/item names (first column)
    name_col = df.columns[0]
    row_names = df[name_col].to_numpy()

    # 3) Find blank rows separating sessions (all day columns NaN)
    breaks = np.where(df[ALLDAYS].isna().all(axis=1))[0]
    if len(breaks) < 4:
        raise ValueError(f"Expected at least 4 session breaks; found {len(breaks)}")

    # 4) Prepare final structure
    finalData = {"menu": {}, "dates": {}, "items": {}}
    sessions = ["bf", "ln", "sk", "dn"]

    # 5) Populate list of item names per session
    for idx, ses in enumerate(sessions):
        start, end = breaks[idx] + 1, breaks[idx + 1]
        finalData["items"][ses] = row_names[start:end].tolist()

    # 6) Build date map and menus for each weekday
    for day_num, day in enumerate(ALLDAYS):
        # a) Map each calendar date to its weekday index
        for raw in df[day].iloc[:breaks[0]]:
            if pd.isna(raw):
                continue
            try:
                dt = datetime.datetime.strptime(str(raw).strip(), "%d-%b-%y")
            except ValueError:
                continue
            key = dt.strftime("%d-%m-%Y")
            finalData["dates"][key] = str(day_num)

        # b) Timings differ on weekends
        if day in ["SATURDAY", "SUNDAY"]:
            timings = {
                "bfTimings": {"start": "07:45AM", "end": "10:00AM"},
                "lnTimings": {"start": "12:45PM", "end": "02:30PM"},
                "skTimings": {"start": "04:30PM", "end": "05:45PM"},
                "dnTimings": {"start": "07:30PM", "end": "09:30PM"},
            }
        else:
            timings = {
                "bfTimings": {"start": "07:30AM", "end": "09:45AM"},
                "lnTimings": {"start": "12:30PM", "end": "02:15PM"},
                "skTimings": {"start": "04:30PM", "end": "05:45PM"},
                "dnTimings": {"start": "07:30PM", "end": "09:30PM"},
            }

        block = dict(timings)

        # c) For each session, extract the dish for this day
        for idx, ses in enumerate(sessions):
            start, end = breaks[idx] + 1, breaks[idx + 1]
            block[ses] = {}
            for row_idx in range(start, end):
                item = row_names[row_idx]
                raw_val = df.at[row_idx, day]
                part = "MT" if pd.isna(raw_val) else raw_val

                low = str(part).strip().lower()
                if "egg" in low or "omlet" in low:
                    code = "EGG"
                elif any(x in low for x in ["chicken", "fish"]):
                    code = "NON"
                else:
                    code = "VEG"

                block[ses][item] = {
                    "name": str(part).strip().title(),
                    "eggy": code,
                }

        finalData["menu"][day_num] = block

    # 7) Write outputs
    with open("out.json", "w") as jf:
        json.dump(finalData, jf, indent=2)
    with open("out.txt", "w") as hf:
        hf.write(hashlib.md5(json.dumps(finalData).encode()).hexdigest())

    print("Wrote out.json and MD5 in out.txt")