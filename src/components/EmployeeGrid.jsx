import EmployeeCard from './EmployeeCard'

function EmployeeGrid({ employees }) {
  if (employees.length === 0) {
    return <p className="empty">No employees yet.</p>
  }

  return (
    <div className="grid">
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  )
}

export default EmployeeGrid
