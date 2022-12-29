import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthProvider';

const AddTask = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);
    const imgbbHostingKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate();

    const handleAddProduct = data => {
        // console.log(data);
        const image = data.productImg[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgbbHostingKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    console.log(imgData.data.url);
                    const task = {
                        taskName: data.taskName,
                        description: data.description,
                        postedDate: data.postedDate,
                        productImg: imgData.data.url,
                        name: user.displayName,
                        email: user.email
                    }
                    // save product information to the database
                    fetch('https://todo-server-five.vercel.app/tasks', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(task)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result)
                            if (result.acknowledged) {
                                toast.success(`${data.taskName} is added successfully`, { autoClose: 500 })
                                navigate('/mytask')
                            }
                        });
                }
            })
    }

    return (
        <div>
            <h1 className='text-3xl text-cyan-500 font-bold my-6 text-center'>Add Your Task</h1>
            <form onSubmit={handleSubmit(handleAddProduct)} className='w-2/3 mx-auto'>
                <div className="form-control w-full">
                    <label className="label"><span className="label-text text-gray-400">Task Title</span></label>
                    <input type="text" {...register('taskName', { required: 'please enter your task Title' })} className="border-2 w-full mb-2 py-1" />
                    {errors.taskName && <p className='text-red-400'>{errors.taskName?.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label"><span className="label-text text-gray-400">Todays Date</span></label>
                    <input type="date" {...register('postedDate', { required: 'Please select Todays date', minLength: 6, maxLength: 12 })} className="border-2 w-full mb-2 py-1" />
                    {errors.postedDate && <p className='text-red-400'>{errors.postedDate?.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label"><span className="label-text text-gray-400">Upload a Photo</span></label>
                    <input type="file" {...register('productImg', { required: 'photo is required' })} className="border-2 w-full mb-2 py-1" />
                    {errors.productImg && <p className='text-red-400'>{errors.productImg?.message}</p>}
                </div>
                <div className="form-control w-full">
                    <label className="label"><span className="label-text text-gray-400">Details About Your Task</span></label>
                    <input type="text" {...register('description', { required: 'please provide details about Task' })} className="border-2 w-full mb-2 py-3" />
                    {errors.description && <p className='text-red-400'>{errors.description?.message}</p>}
                </div>
                <input className='btn border-0 mt-8 block w-full p-3 text-center rounded-md dark:text-gray-200 hover:text-white bg-gradient-to-r from-cyan-600 to-cyan-300 hover:to-cyan-300 hover:from-cyan-600' type="submit" value='Add Tasks' />
            </form>
        </div>
    );
};

export default AddTask;