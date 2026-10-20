import api from './api'

export async function getEmployees() {
  const response = await api.get('/users')
  return response.data
}

export async function createEmployee(employee) {
  const response = await api.post('/users', employee)
  return response.data
}
