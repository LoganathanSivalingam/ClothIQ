import os
from dotenv import load_dotenv
from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_community.utilities import SQLDatabase
from langchain_chroma import Chroma
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS

# ------------------- Load Environment -------------------
load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# ------------------- Globals -------------------
db = None
vector_db = None

# Initialize Flask app
app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

# ------------------- MySQL Functions -------------------
def connect_mysql():
    global db
    db_uri = "mysql+mysqlconnector://root:root@localhost:3306/clothing_microbrand"
    try:
        db = SQLDatabase.from_uri(db_uri)
        print("✅ MySQL DB connected successfully.")
    except Exception as e:
        print(f"❌ Failed to connect to MySQL DB: {str(e)}")
        db = None

def run_query(query):
    try:
        # For direct SQL queries where we need a specific format
        # The SQLDatabase.run method usually returns a string.
        # For visualization, we need structured data (list of dicts or tuples).
        # We'll handle this directly in the new API endpoints using mysql.connector
        return db.run(query) if db else "DB not connected."
    except Exception as e:
        return f"❌ SQL Error: {str(e)}"

def get_schema():
    return db.get_table_info() if db else "DB not connected."

def generate_sql_query(question, schema):
    prompt = f"""
You are a SQL expert.

Using the schema below, generate a correct MySQL query to answer the question.
Make sure all columns in the SELECT statement are either aggregated or included in the GROUP BY clause to avoid ONLY_FULL_GROUP_BY errors.

Schema:
{schema}

Question:
{question}

Only return the SQL query. Do not use markdown or explanation.
"""
    model = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.3)
    response = model.invoke(prompt)
    return response.content.strip().replace("```sql", "").replace("```", "").strip()

# ------------------- PDF to Chroma -------------------
def load_pdfs_to_chroma(pdf_paths):
    text = ""
    for path in pdf_paths:
        reader = PdfReader(path)
        for page in reader.pages:
            content = page.extract_text()
            if content:
                text += content

    splitter = RecursiveCharacterTextTextSplitter(chunk_size=10000, chunk_overlap=1000)
    chunks = splitter.split_text(text)

    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    vector_store = Chroma.from_texts(chunks, embedding=embeddings, persist_directory="chroma_store")
    print("✅ ChromaDB vector store saved to 'chroma_store/'")

def load_chroma():
    global vector_db
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    try:
        vector_db = Chroma(persist_directory="chroma_store", embedding_function=embeddings)
        print("✅ ChromaDB loaded successfully.")
    except Exception as e:
        print(f"❌ Failed to load ChromaDB: {str(e)}")
        vector_db = None

def get_relevant_docs(question):
    return vector_db.similarity_search(question) if vector_db else []

# ------------------- Final Answer -------------------
def combined_business_answer(user_question):
    try:
        schema = get_schema()
        sql_result = None
        sql_query = None

        if db:
            sql_query = generate_sql_query(user_question, schema)
            if "SELECT" in sql_query.upper():
                # For combined_business_answer, we use db.run() which returns a string.
                # The new visualization endpoints will use a direct cursor for structured data.
                sql_result = run_query(sql_query)
        else:
            print("Skipping SQL query generation and execution: DB not connected.")

        docs = get_relevant_docs(user_question)
        context = "\n\n".join([doc.page_content for doc in docs]) if docs else ""

        model = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.3)

        if sql_result and isinstance(sql_result, str) and "SQL Error" in sql_result and not context:
            return sql_result
        elif sql_result and (isinstance(sql_result, list) or (isinstance(sql_result, str) and "DB not connected" not in sql_result)) and not context:
            prompt = f"""
You are a business assistant.

Use the SQL result below to answer the user's question in clear, human language.

SQL result: {sql_result}

Question: {user_question}

Give a short, direct answer. Do not mention SQL or tables.
"""
            return model.invoke(prompt).content.strip()

        elif context and not sql_result:
            prompt = f"""
You are a business assistant.

Use the context below to answer the user's question.

Context: {context}

Question: {user_question}

Answer in clear and simple business language. Don't mention documents.
"""
            return model.invoke(prompt).content.strip()

        elif sql_result and context:
            prompt = f"""
You are a business assistant.

Use both the SQL result and document context to answer the business question.

SQL result: {sql_result}
Context: {context}

Question: {user_question}

Give only the final business recommendation. No SQL or reference to documents.

✅ Answer Requirements:
- The answer must be at least 4 lines.
- Make the answer business-focused, practical, and human-readable.
- Do NOT mention SQL, tables, or documents directly.
"""
            return model.invoke(prompt).content.strip()

        else:
            return "I couldn't find an answer. Please try a different question or ensure necessary resources (DB/Chroma) are available."

    except Exception as e:
        return f"❌ Error in combined_business_answer: {str(e)}"

# ------------------- API Endpoints -------------------

@app.route('/ask', methods=['POST'])
def ask_question():
    data = request.get_json()
    user_question = data.get('question')

    if not user_question:
        return jsonify({"error": "No question provided"}), 400

    answer = combined_business_answer(user_question)
    return jsonify({"answer": answer})

@app.route('/health', methods=['GET'])
def health_check():
    status = {
        "mysql_connected": db is not None,
        "chroma_loaded": vector_db is not None,
        "api_status": "operational"
    }
    return jsonify(status)

@app.route('/load_pdfs', methods=['POST'])
def api_load_pdfs():
    data = request.get_json()
    pdf_paths = data.get('pdf_paths')

    if not pdf_paths or not isinstance(pdf_paths, list):
        return jsonify({"error": "Please provide a list of PDF paths"}), 400

    try:
        load_pdfs_to_chroma(pdf_paths)
        return jsonify({"message": "PDFs loaded and indexed into ChromaDB successfully."})
    except Exception as e:
        return jsonify({"error": f"Failed to load PDFs: {str(e)}"}), 500

# ------------------- NEW: Data Endpoints for Visualization -------------------

# Helper function to get a raw database connection (needed for structured data)
def get_raw_db_connection():
    import mysql.connector # Import locally to avoid circular dependency if not already imported globally
    from config import DATABASE_CONFIG # Assuming config.py is in the same directory
    try:
        conn = mysql.connector.connect(**DATABASE_CONFIG)
        return conn
    except mysql.connector.Error as err:
        print(f"Error connecting to database for raw query: {err}")
        return None

@app.route('/api/data/products', methods=['GET'])
def get_products_data():
    conn = get_raw_db_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500
    cursor = conn.cursor(dictionary=True) # Returns rows as dictionaries

    try:
        cursor.execute("SELECT * FROM products")
        products = cursor.fetchall()
        return jsonify(products)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/api/data/campaigns', methods=['GET'])
def get_campaigns_data():
    conn = get_raw_db_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("SELECT * FROM campaigns")
        campaigns = cursor.fetchall()
        # Convert date objects to strings for JSON serialization
        for campaign in campaigns:
            if 'start_date' in campaign and campaign['start_date']:
                campaign['start_date'] = campaign['start_date'].isoformat()
            if 'end_date' in campaign and campaign['end_date']:
                campaign['end_date'] = campaign['end_date'].isoformat()
        return jsonify(campaigns)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/api/data/employees', methods=['GET'])
def get_employees_data():
    conn = get_raw_db_connection()
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

@app.route('/api/data/customers', methods=['GET'])
def get_customers_data():
    conn = get_raw_db_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("SELECT * FROM customers")
        customers = cursor.fetchall()
        # Convert date objects to strings for JSON serialization
        for customer in customers:
            if 'registration_date' in customer and customer['registration_date']:
                customer['registration_date'] = customer['registration_date'].isoformat()
            if 'last_purchase_date' in customer and customer['last_purchase_date']:
                customer['last_purchase_date'] = customer['last_purchase_date'].isoformat()
        return jsonify(customers)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/api/data/sales', methods=['GET'])
def get_sales_data():
    conn = get_raw_db_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("SELECT * FROM sales")
        sales = cursor.fetchall()
        # Convert date objects to strings for JSON serialization
        for sale in sales:
            if 'sale_date' in sale and sale['sale_date']:
                sale['sale_date'] = sale['sale_date'].isoformat()
        return jsonify(sales)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/api/data/campaign_results', methods=['GET'])
def get_campaign_results_data():
    conn = get_raw_db_connection()
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

@app.route('/api/data/feedback', methods=['GET'])
def get_feedback_data():
    conn = get_raw_db_connection()
    if conn is None:
        return jsonify({"error": "Database connection failed"}), 500
    cursor = conn.cursor(dictionary=True)

    try:
        cursor.execute("SELECT * FROM feedback")
        feedback = cursor.fetchall()
        # Convert date objects to strings for JSON serialization
        for entry in feedback:
            if 'feedback_date' in entry and entry['feedback_date']:
                entry['feedback_date'] = entry['feedback_date'].isoformat()
        return jsonify(feedback)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# ------------------- Main Execution -------------------
if __name__ == "__main__":
    print("Initializing AI Business Analyst API...")
    connect_mysql()
    load_chroma()

    print("✅ Flask API starting on http://127.0.0.1:5000/")
    app.run(debug=True)