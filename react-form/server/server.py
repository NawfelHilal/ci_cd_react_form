import mysql.connector
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import date
from typing import List

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


@app.post("/users")
async def create_user(user: User):
    conn = None
    cursor = None
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
        conn.commit()
        return {"message": "User created successfully", "user": user.dict()}
    except mysql.connector.Error as e:
        if e.errno == 1062:
            raise HTTPException(
                status_code=409, detail="Un utilisateur avec cet email existe déjà."
            )
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if cursor:
            cursor.close()
        if conn:
            conn.close()


class UserReduced(BaseModel):
    firstName: str
    lastName: str
    email: str


@app.get("/users", response_model=List[UserReduced])
def get_users():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT firstName, lastName, email FROM users")
    users = cursor.fetchall()
    cursor.close()
    conn.close()
    return users
