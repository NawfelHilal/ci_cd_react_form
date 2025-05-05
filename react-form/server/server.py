import mysql.connector
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import date


# Modèle de données pour l'utilisateur
class User(BaseModel):
    firstName: str
    lastName: str
    email: str
    dob: date
    city: str
    postalCode: str


app = FastAPI()
origins = [
    "http://localhost:3000",  # React app en développement local
    "http://frontend:3000",  # React app dans Docker
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/users")
async def get_users():
    # Create a connection to the database
    conn = mysql.connector.connect(
        database=os.getenv("MYSQL_DATABASE"),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_ROOT_PASSWORD"),
        host=os.getenv("MYSQL_HOST"),
    )

    cursor = conn.cursor()
    sql_select_Query = "select * from users"
    cursor.execute(sql_select_Query)
    # get all records
    records = cursor.fetchall()
    print("Total number of rows in table: ", cursor.rowcount)
    # renvoyer nos données et 200 code OK
    return {"users": records}


@app.post("/users")
async def create_user(user: User):
    # Create a connection to the database
    conn = mysql.connector.connect(
        database=os.getenv("MYSQL_DATABASE"),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_ROOT_PASSWORD"),
        host=os.getenv("MYSQL_HOST"),
    )

    cursor = conn.cursor()
    sql_insert_query = """
    INSERT INTO users (firstName, lastName, email, dob, city, postalCode)
    VALUES (%s, %s, %s, %s, %s, %s)
    """
    values = (
        user.firstName,
        user.lastName,
        user.email,
        user.dob,
        user.city,
        user.postalCode,
    )

    cursor.execute(sql_insert_query, values)
    conn.commit()

    return {"message": "User created successfully", "user": user.dict()}
