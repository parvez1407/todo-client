import React, { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditTask = () => {
    const storedTask = useLoaderData();
    const [edit, setEdit] = useState(storedTask);
    const navigate = useNavigate();

    const handleEdit = event => {
        event.preventDefault()
        // console.log(review);
        fetch(`http://localhost:5000/task/${storedTask._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(edit)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Data Updated Successfully', { autoClose: 500 })
                    navigate('/mytask')
                }
            })
    }

    const handleOnChange = event => {
        const field = event.target.name;
        const value = event.target.value;
        const newEdit = { ...edit }
        newEdit[field] = value;
        setEdit(newEdit);
    }
    return (
        <div>
            <div className='text-center mb-5'>
                <h3 className="text-cyan-500 text-4xl font-bold">Update Task</h3>
            </div>
            <form onSubmit={handleEdit} className='w-2/3 mx-auto'>
                <input onChange={handleOnChange} defaultValue={storedTask?.taskName} type="text" name="taskName" id="" placeholder='Task Name' className='w-full border px-3 py-3 rounded-md border-cyan-300 outline-cyan-600' />
                <input onChange={handleOnChange} defaultValue={storedTask?.description} type="text" name="description" id="" placeholder='Description' className='w-full border px-3 py-3 rounded-md border-cyan-300 outline-cyan-600 mt-3' />
                <div className='flex justify-center mt-3'>
                    <button type='submit' className='w-1/3 px-5 py-3 bg-cyan-500 hover:bg-cyan-700 text-gray-100 rounded-md'>Update</button>
                </div>
            </form>

        </div>
    );
};

export default EditTask;