import { createBrowserRouter } from "react-router-dom"
import Main from "../layout/Main/Main"
import AddTask from "../pages/AddTask/AddTask"
import CompletedTask from "../pages/CompletedTask/CompletedTask"
import EditTask from "../pages/EditTask/EditTask"
import Login from "../pages/Login/Login/Login"
import Register from "../pages/Login/Register/Register"
import MyTask from "../pages/MyTask/MyTask"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/addtask',
                element: <AddTask></AddTask>
            },
            {
                path: '/mytask',
                element: <MyTask></MyTask>
            },
            {
                path: '/completedtask',
                element: <CompletedTask></CompletedTask>
            },
            {
                path: '/edittask/:id',
                element: <EditTask></EditTask>,
                loader: ({ params }) => fetch(`https://todo-server-five.vercel.app/task/${params.id}`)
            },
        ]
    }
])