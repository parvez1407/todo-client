import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthProvider';
import Loader from '../../context/Loader/Loader';

const CompletedTask = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const { data: tasks = [], refetch, isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/tasks/${user?.email}`);
            const data = await res.json();
            return data;
        }
    })



    const handleCompleted = (task) => {
        const complete = {
            id: task
        }

        fetch(`http://localhost:5000/incomplete/${task._id}`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',

            },
            body: JSON.stringify(complete)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

            })
        toast.success('Incomplete Successfully', { autoClose: 500 })
        // navigate('/mytask')
    }

    const handleDelete = id => {
        const proceed = window.confirm('Are you sure, you want to Delete?');
        if (proceed) {
            fetch(`http://localhost:5000/task/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        toast.success('Data Successfully Deleted', { autoClose: 500 })
                        refetch()
                    }
                })

        }
    }

    // const handleComment = (e, id) => {
    //     e.preventDefault();
    //     const comment = e.target.comment.value;
    //     const comm = {
    //         comment,
    //         id
    //     }
    //     fetch(`http://localhost:5000/comments/${task._id}`, {
    //         method: 'PUT',
    //         headers: {
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(comm)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);

    //         })

    // }

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
                            <th>Action</th>
                            <th>complete</th>
                            <th>Comment</th>
                            <th>Make Comment</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            tasks?.map(task => <tr key={task?._id}>
                                {task.complete && <>
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
                                        <button onClick={() => handleDelete(task?._id)} className='px-4  rounded-sm bg-red-900 text-white'>Delete</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleCompleted(task._id)} className='px-4  rounded-sm bg-yellow-900 text-white'>Mark Incomplete</button>
                                    </td>
                                    <td>

                                    </td>
                                    <td>
                                        <form>
                                            <input type="text" className='border-2' name='comment' />
                                        </form>
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

export default CompletedTask;