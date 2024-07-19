import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Dia from './pages/dia/Dia'
import Login from './pages/login/Login'
import Description from './pages/description/Description'

const router = createBrowserRouter([
  {
    index: true,
    path: '/:date?',
    element: <Dia />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/:date/:taskId', //'/tarefa/:date/:taskId'
    element: <Description />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
