import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './pages/login/Login'
import Description from './pages/description/Description'
import ErrorPage from './pages/error/ErrorPage'
import NewDia from './pages/NewDia/NewDia'

const router = createBrowserRouter([
  {
    index: true,
    path: '/:date?',
    element: <NewDia />,
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
