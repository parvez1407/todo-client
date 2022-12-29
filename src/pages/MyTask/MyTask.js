import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthProvider';
import Loader from '../../context/Loader/Loader';

const MyTask = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { data: tasks = [], refetch, isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch(`https://todo-server-five.vercel.app/tasks/${user?.email}`);
            const data = await res.json();
            return data;
        }
    })


    const handleCompleted = (task) => {
        const complete = {
            id: task
        }
        fetch(`https://todo-server-five.vercel.app/completed/${task._id}`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(complete)
        }).then(res => res.json())
            .then(result => {
                console.log(result);
            })
        toast.success('Completed Successfully', { autoClose: 500 })
        // navigate('/completedtask')
    }

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you want to Delete?');
        if (proceed) {
            fetch(`https://todo-server-five.vercel.app/task/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        toast.success('Data Successfully Deleted', { autoClose: 500 })
                        refetch();
                    }
                })

        }
    }

    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div>
            <h1 className='text-3xl text-cyan-500 font-bold my-6 text-center'>My Tasks</h1>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">

                    <thead>
                        <tr className='text-left'>
                            <th>Image</th>
                            <th>Name of Task</th>
                            <th>Task Description</th>
                            <th>Name of User</th>
                            <th>Update</th>
                            <th>Action</th>
                            <th>complete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            tasks?.map(task => <tr key={task?._id}>
                                {!task.complete && <>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={task?.productImg} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {task.taskName}
                                    </td>
                                    <td>
                                        {task.description}
                                    </td>
                                    <td>
                                        {task.name}
                                    </td>
                                    <td>
                                        <Link to={`/edittask/${task._id}`}><button className='px-4  rounded-sm bg-green-900 text-white'>Edit</button></Link>
                                    </td>
                                    <td>
                                        <button onClick={() => handleDelete(task?._id)} className='px-4  rounded-sm bg-red-900 text-white'>Delete</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleCompleted(task._id)} className='px-4  rounded-sm bg-blue-900 text-white'>Complete Task</button>
                                    </td>
                                </>}

                            </tr>)
                        }
                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default MyTask;