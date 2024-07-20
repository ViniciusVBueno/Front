import axios from 'axios'

const api = axios.create({
  baseURL: 'https://bueno-devs-todo-api.fly.dev',
})

export default api
