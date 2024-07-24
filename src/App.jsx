import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Dia from './pages/dia/Dia'
import Login from './pages/login/Login'
import Description from './pages/description/Description'
import ErrorPage from './pages/error/ErrorPage'
import Loader from './pages/loader/Loader'

const router = createBrowserRouter([
  {
    index: true,
    path: '/:date?',
    element: <Dia />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/:date/:taskId', //'/tarefa/:date/:taskId'
    element: <Description />,
    errorElement: <ErrorPage />,
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
