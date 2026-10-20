import { useState } from 'react'

const fields = [
  { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Peter Parker', required: true },
  { name: 'username', label: 'Username', type: 'text', placeholder: 'spidey', required: true },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'peter@dailybugle.com', required: true },
  { name: 'phone', label: 'Phone', type: 'tel', placeholder: '555-123-4567' },
  { name: 'city', label: 'City', type: 'text', placeholder: 'Queens' },
  { name: 'company', label: 'Company', type: 'text', placeholder: 'Daily Bugle' },
]

const emptyForm = {
  name: '',
  username: '',
  email: '',
  phone: '',
  city: '',
  company: '',
}

function AddEmployeeModal({ onClose, onSave }) {
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      await onSave({
        name: form.name.trim(),
        username: form.username.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        address: { city: form.city.trim() },
        company: { name: form.company.trim() },
      })
    } catch (err) {
      setError('Could not save employee: ' + err.message)
      setSaving(false)
    }
  }

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Add New Employee</h2>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <label key={field.name}>
              {field.label} {field.required && <span className="required">*</span>}
              <input
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={form[field.name]}
                onChange={handleChange}
                required={field.required}
              />
            </label>
          ))}

          {error && <p className="form-error">{error}</p>}

          <div className="modal-buttons">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button type="submit" className="btn" disabled={saving}>
              {saving ? 'Saving...' : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEmployeeModal
