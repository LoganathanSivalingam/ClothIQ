# app.py

from flask import Flask, jsonify
from flask_cors import CORS # Import CORS
import mysql.connector
from config import DATABASE_CONFIG

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# Function to get a database connection
def get_db_connection():
    try:
        conn = mysql.connector.connect(**DATABASE_CONFIG)
        return conn
    except mysql.connector.Error as err:
        print(f"Error connecting to database: {err}")
        return None

# --- API Endpoints for each table ---

@app.route('/api/products', methods=['GET'])
def get_products():
    conn = get_db_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500
    cursor = conn.cursor(dictionary=True) # Use dictionary=True to get results as dicts

    try:
        cursor.execute("SELECT * FROM products")
        products = cursor.fetchall()
        return jsonify(products)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/api/campaigns', methods=['GET'])
def get_campaigns():
    conn = get_db_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("SELECT * FROM campaigns")
        campaigns = cursor.fetchall()
        return jsonify(campaigns)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/api/employees', methods=['GET'])
def get_employees():
    conn = get_db_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("SELECT * FROM employees")
        employees = cursor.fetchall()
        return jsonify(employees)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/api/customers', methods=['GET'])
def get_customers():
    conn = get_db_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("SELECT * FROM customers")
        customers = cursor.fetchall()
        return jsonify(customers)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/api/sales', methods=['GET'])
def get_sales():
    conn = get_db_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("SELECT * FROM sales")
        sales = cursor.fetchall()
        return jsonify(sales)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/api/campaign_results', methods=['GET'])
def get_campaign_results():
    conn = get_db_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("SELECT * FROM campaign_results")
        campaign_results = cursor.fetchall()
        return jsonify(campaign_results)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/api/feedback', methods=['GET'])
def get_feedback():
    conn = get_db_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("SELECT * FROM feedback")
        feedback = cursor.fetchall()
        return jsonify(feedback)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/')
def home():
    return "Welcome to the Microbrand Data API!"

if __name__ == '__main__':
    app.run(debug=True) # debug=True reloads the server on code changes