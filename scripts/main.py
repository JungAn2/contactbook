from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)
DATABASE = "contactbook.db"

if not os.path.exists(DATABASE):
    with sqlite3.connect(DATABASE) as conn:
        with open(os.path.join(os.path.dirname(__file__), 'init.sql'), 'r') as f:
            conn.executescript(f.read())
            

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/contacts', methods=['GET'])
def get_contacts():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Contacts")
    contacts = cursor.fetchall()
    conn.close()
    return jsonify([dict(contact) for contact in contacts])

@app.route('/contacts', methods=['POST'])
def add_contact():
    new_contact = request.json
    name = new_contact.get('name')
    phone = new_contact.get('phone')

    if not name or not phone:
        return jsonify({"error": "Missing required fields"}), 400

    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO Contacts (name, phone) VALUES (?, ?)",
            (name, phone)
        )
        conn.commit()
        return jsonify({"message": "Contact added successfully"}), 201
    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()

if __name__ == "__main__":
    app.run(debug=True)