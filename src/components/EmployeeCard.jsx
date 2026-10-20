const colors = ['#f87171', '#fb923c', '#facc15', '#4ade80', '#60a5fa', '#a78bfa', '#f472b6']

function getInitials(name) {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function EmployeeCard({ employee }) {
  const color = colors[employee.id % colors.length]

  return (
    <div className="card">
      {employee.isNew && <span className="new-badge">NEW</span>}
      <div className="avatar" style={{ backgroundColor: color }}>
        {getInitials(employee.name)}
      </div>
      <h3>{employee.name}</h3>
      <p className="username">@{employee.username}</p>
      <div className="card-info">
        <p>📧 {employee.email}</p>
        {employee.phone && <p>📞 {employee.phone}</p>}
        {employee.address?.city && <p>📍 {employee.address.city}</p>}
        {employee.company?.name && <p>🏢 {employee.company.name}</p>}
      </div>
    </div>
  )
}

export default EmployeeCard
