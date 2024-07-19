import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Dia from './pages/dia/Dia'
import Login from './pages/login/Login'
import Description from './pages/description/Description'

const router = createBrowserRouter([
  {
    index: true,
    path: '/',
    element: <Login />,
  },
  {
    path: ':date',
    element: <Dia />,
  },
  {
    path: '/dia/:date',
    element: <Dia />,
  },
  {
    path: '/tarefa/:date/:taskId', //'/tarefa/:date/:taskId'
    element: <Description />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
