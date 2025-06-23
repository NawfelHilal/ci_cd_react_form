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

# Configuration CORS
origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db_connection():
    return mysql.connector.connect(
        host=os.getenv("MYSQL_HOST", "db"),
        user=os.getenv("MYSQL_USER", "root"),
        password=os.getenv("MYSQL_ROOT_PASSWORD", "ynovpwd"),
        database=os.getenv("MYSQL_DATABASE", "ynov_ci"),
    )


@app.get("/")
async def hello_world():
    return {"message": "Hello World"}


@app.get("/users")
async def get_users():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()
        print("Users from database:", users)
        cursor.close()
        conn.close()
        return {"users": users}
    except Exception as e:
        print("Database error:", str(e))
        return {"users": [], "error": str(e)}


@app.post("/users")
async def create_user(user: User):
    try:
        conn = get_db_connection()
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
        conn.commit()  # Important : commit les changements

        cursor.close()
        conn.close()

        return {"message": "User created successfully", "user": user.dict()}
    except Exception as e:
        print("Database error:", str(e))
        return {"error": str(e)}


class UserReduced(BaseModel):
    firstName: str
    lastName: str
    email: str


@app.get("/users", response_model=list[UserReduced])
def get_users():
    conn = mysql.connector.connect(
        host="db",  # ou selon ta config
        user="root",
        password="root",
        database="your_db",
    )
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT firstName, lastName, email FROM users")
    users = cursor.fetchall()
    cursor.close()
    conn.close()
    return users
