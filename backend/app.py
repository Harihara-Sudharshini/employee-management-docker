from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
import os

app = Flask(__name__)
CORS(app)

def get_db_connection():
    return mysql.connector.connect(
    host=os.getenv("DB_HOST", "employee-mysql"),
    user=os.getenv("DB_USER", "root"),
    password=os.getenv("DB_PASSWORD", "EmployeeRoot123"),
    database=os.getenv("DB_NAME", "employee_db"),
    port=int(os.getenv("DB_PORT", "3306"))
    )

def initialize_database():
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS employees (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        department VARCHAR(100) NOT NULL,
        salary DECIMAL(10, 2) NOT NULL
    )
""")

    cursor.execute("SELECT COUNT(*) FROM employees")
    count = cursor.fetchone()[0]

    if count == 0:
        cursor.executemany(
        """
        INSERT INTO employees (name, department, salary)
        VALUES (%s, %s, %s)
        """,
        [
            ("Arun", "IT", 30000),
            ("Priya", "HR", 35000),
            ("Rahul", "Finance", 40000)
        ]
    )

    connection.commit()
    cursor.close()
    connection.close()

@app.route("/")
def home():
    return "Employee Management System Backend is Running!"

@app.route("/employees", methods=["GET"])
def get_employees():
    connection = get_db_connection()
    cursor = connection.cursor(dictionary=True)

    cursor.execute(
    "SELECT id, name, department, salary FROM employees ORDER BY id"
)
    employees = cursor.fetchall()

    for employee in employees:
        employee["salary"] = float(employee["salary"])

    cursor.close()
    connection.close()

    return jsonify(employees)

@app.route("/employees", methods=["POST"])
def add_employee():
    data = request.get_json()

    if not data or not all(
        key in data for key in ("name", "department", "salary")
):
        return jsonify({"error": "Name, department, and salary are required"}), 400

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute(
    """
    INSERT INTO employees (name, department, salary)
    VALUES (%s, %s, %s)
    """,
    (data["name"], data["department"], data["salary"])
)

    connection.commit()
    employee_id = cursor.lastrowid

    cursor.close()
    connection.close()

    return jsonify({
    "id": employee_id,
    "name": data["name"],
    "department": data["department"],
    "salary": float(data["salary"])
}), 201

@app.route("/employees/<int:employee_id>", methods=["PUT"])
def update_employee(employee_id):
    data = request.get_json()

    if not data:
        return jsonify({"error": "Employee data is required"}), 400

    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute(
    """
    UPDATE employees
    SET name = %s, department = %s, salary = %s
    WHERE id = %s
    """,
    (
        data.get("name"),
        data.get("department"),
        data.get("salary"),
        employee_id
    )
)

    connection.commit()
    updated = cursor.rowcount

    cursor.close()
    connection.close()

    if updated == 0:
        return jsonify({"error": "Employee not found or no changes made"}), 404

    return jsonify({"message": "Employee updated successfully"})

@app.route("/employees/<int:employee_id>", methods=["DELETE"])
def delete_employee(employee_id):
    connection = get_db_connection()
    cursor = connection.cursor()

    cursor.execute(
    "DELETE FROM employees WHERE id = %s",
    (employee_id,)
)

    connection.commit()
    deleted = cursor.rowcount

    cursor.close()
    connection.close()

    if deleted == 0:
        return jsonify({"error": "Employee not found"}), 404

    return jsonify({"message": "Employee deleted successfully"})

if __name__ == "__main__":
    initialize_database()
app.run(host="0.0.0.0", port=5000, debug=True)