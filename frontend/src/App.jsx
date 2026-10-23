
import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://127.0.0.1:5000/employees";

function App() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    name: "",
    department: "",
    salary: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function fetchEmployees() {
    try {
      setError("");
      const response = await fetch(API_URL);

      if (!response.ok) throw new Error("Could not load employees");

      const data = await response.json();
      setEmployees(data);
    } catch {
      setError("Cannot connect to the backend. Make sure Flask is running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const employeeData = {
      name: form.name.trim(),
      department: form.department.trim(),
      salary: Number(form.salary),
    };

    if (!employeeData.name || !employeeData.department || employeeData.salary <= 0) {
      setError("Please enter a name, department, and positive salary.");
      return;
    }

    try {
      setError("");

      const response = await fetch(
        editingId ? `${API_URL}/${editingId}` : API_URL,
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employeeData),
        }
      );

      if (!response.ok) throw new Error("Unable to save employee");

      setForm({ name: "", department: "", salary: "" });
      setEditingId(null);
      await fetchEmployees();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  }

  function startEditing(employee) {
    setEditingId(employee.id);
    setForm({
      name: employee.name,
      department: employee.department,
      salary: String(employee.salary),
    });
  }

  async function deleteEmployee(id) {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      setError("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Unable to delete employee");

      await fetchEmployees();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    }
  }

  function cancelEditing() {
    setEditingId(null);
    setForm({ name: "", department: "", salary: "" });
    setError("");
  }

  const totalSalary = employees.reduce(
    (sum, employee) => sum + Number(employee.salary),
    0
  );

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">E</div>
          <span>EmployEase</span>
        </div>

        <p className="nav-heading">WORKSPACE</p>
        <div className="nav-item active">▦ &nbsp; Dashboard</div>
        <div className="nav-item">♙ &nbsp; Employees</div>

        <div className="sidebar-bottom">
          <div className="avatar">AD</div>
          <div>
            <strong>Administrator</strong>
            <small>Management</small>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">WORKSPACE / OVERVIEW</p>
            <h1>Employee Dashboard</h1>
            <p className="subtitle">
              Manage your people and keep your team organized.
            </p>
          </div>
          <div className="top-badge">● System Online</div>
        </header>

        {error && <div className="error-message">{error}</div>}

        <section className="stats">
          <div className="stat-card">
            <span className="stat-icon purple">♙</span>
            <p>Total Employees</p>
            <h2>{employees.length}</h2>
            <small>Employees in the system</small>
          </div>

          <div className="stat-card">
            <span className="stat-icon green">▤</span>
            <p>Departments</p>
            <h2>{new Set(employees.map((e) => e.department)).size}</h2>
            <small>Unique departments</small>
          </div>

          <div className="stat-card">
            <span className="stat-icon orange">₹</span>
            <p>Total Salary</p>
            <h2>₹{totalSalary.toLocaleString("en-IN")}</h2>
            <small>Combined employee salaries</small>
          </div>
        </section>

        <section className="content-grid">
          <div className="panel employee-panel">
            <div className="panel-heading">
              <div>
                <h2>Employee Directory</h2>
                <p>View and manage your team members.</p>
              </div>
              <span className="count-badge">{employees.length} employees</span>
            </div>

            {loading ? (
              <p className="empty-state">Loading employees...</p>
            ) : employees.length === 0 ? (
              <p className="empty-state">No employees found. Add your first employee!</p>
            ) : (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>EMPLOYEE</th>
                      <th>DEPARTMENT</th>
                      <th>SALARY</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees.map((employee) => (
                      <tr key={employee.id}>
                        <td>
                          <div className="employee-name">
                            <span className="employee-avatar">
                              {employee.name.charAt(0).toUpperCase()}
                            </span>
                            <div>
                              <strong>{employee.name}</strong>
                              <small>EMP-{String(employee.id).padStart(3, "0")}</small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="department-tag">
                            {employee.department}
                          </span>
                        </td>
                        <td>₹{Number(employee.salary).toLocaleString("en-IN")}</td>
                        <td>
                          <div className="actions">
                            <button
                              className="icon-button edit"
                              onClick={() => startEditing(employee)}
                              aria-label={`Edit ${employee.name}`}
                              title="Edit employee"
                            >
                              ✎
                            </button>
                            <button
                              className="icon-button delete"
                              onClick={() => deleteEmployee(employee.id)}
                              aria-label={`Delete ${employee.name}`}
                              title="Delete employee"
                            >
                              ×
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="panel form-panel">
            <div className="panel-heading">
              <div>
                <h2>{editingId ? "Edit Employee" : "Add Employee"}</h2>
                <p>
                  {editingId
                    ? "Update the employee's details."
                    : "Enter details to add a team member."}
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                placeholder="e.g. Priya Sharma"
                value={form.name}
                onChange={handleChange}
                required
              />

              <label htmlFor="department">Department</label>
              <select
                id="department"
                name="department"
                value={form.department}
                onChange={handleChange}
                required
              >
                <option value="">Select department</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Operations">Operations</option>
                <option value="Engineering">Engineering</option>
              </select>

              <label htmlFor="salary">Monthly Salary (₹)</label>
              <input
                id="salary"
                name="salary"
                type="number"
                min="1"
                placeholder="e.g. 35000"
                value={form.salary}
                onChange={handleChange}
                required
              />

              <button className="primary-button" type="submit">
                {editingId ? "Save Changes" : "+ Add Employee"}
              </button>

              {editingId && (
                <button
                  className="secondary-button"
                  type="button"
                  onClick={cancelEditing}
                >
                  Cancel Editing
                </button>
              )}
            </form>

            <div className="form-note">
              <span>✦</span>
              <p>Employee information is managed through your Flask backend.</p>
            </div>
          </div>
        </section>

        <footer>EmployEase · Employee Management System</footer>
      </main>
    </div>
  );
}

export default App;

