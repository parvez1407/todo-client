import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routes/Routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div className='max-w-[1440px] mx-auto text-gray-500'>
      <ToastContainer position="top-right" />
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
