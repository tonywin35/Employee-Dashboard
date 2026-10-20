import { useEffect, useState } from 'react'
import { getEmployees, createEmployee } from './services/employeeService'
import EmployeeGrid from './components/EmployeeGrid'
import AddEmployeeModal from './components/AddEmployeeModal'
import './App.css'

function App() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showModal, setShowModal] = useState(false)

  const loadEmployees = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getEmployees()
      setEmployees(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEmployees()
  }, [])

  const handleAddEmployee = async (employee) => {
    const savedEmployee = await createEmployee(employee)
    setEmployees((prev) => [{ ...savedEmployee, id: Date.now(), isNew: true }, ...prev])
    setShowModal(false)
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Employee Dashboard</h1>
          {!loading && !error && <p className="count">{employees.length} employees</p>}
        </div>
        <button className="btn" onClick={() => setShowModal(true)}>
          + Add Employee
        </button>
      </header>

      {loading && (
        <div className="status">
          <p>Loading employees...</p>
        </div>
      )}

      {!loading && error && (
        <div className="status error">
          <p>Oops! Something went wrong.</p>
          <p className="error-text">{error}</p>
          <button className="btn" onClick={loadEmployees}>
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && <EmployeeGrid employees={employees} />}

      {showModal && (
        <AddEmployeeModal onClose={() => setShowModal(false)} onSave={handleAddEmployee} />
      )}
    </div>
  )
}

export default App
