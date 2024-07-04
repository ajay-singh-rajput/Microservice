import React from 'react';
import axiosInstance from '../../helper/config/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../../store/action/userAction';

const EmailDetail = ({ mail, close }) => {
  const {userData} = useSelector(state=>state.UserReducer);
  const dispatch = useDispatch();
  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString(); // Adjust date formatting as per your preference
  };

  const changeFolderHandler = async(name)=>{
    try {
      const {data} = await axiosInstance.put(`/auth/user/${userData._id}/mail/${mail._id}/folder`, {folder:name})
      dispatch(fetchUserDetails())
    } catch (error) {
      
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-screen max-w-[600px] ">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-bold">{mail.subject}</h2>
        <span className="text-gray-500">{formatDate(mail.date)}</span>
      </div>
      <div className="mb-4">
        <p className="text-gray-700">{mail.mailBody}</p>
      </div>
      <div className="mb-4">
        <p className="text-gray-700">From: {mail.sender.name}</p>
        <p className="text-gray-700">To: {mail.receiver}</p>
        {mail.cc && <p className="text-gray-700">CC: {mail.cc}</p>}
      </div>
      <div className="mb-4">
        <p className="text-gray-700">Folder: {mail.folder}</p>
        <p className="text-gray-700">Is Favorite: {mail.isFav ? 'Yes' : 'No'}</p>
      </div>
      <div className='w-full border p-4 flex flex-wrap gap-2 items-center justify-center '>
        
        <button onClick={()=>{changeFolderHandler('Spam'); close(false)}} className={`btn btn-error btn-outline ${mail.folder === 'Spam' && 'btn-active'}`}>Spam</button>
        <button onClick={()=>{changeFolderHandler('Trash'); close(false)}} className={`btn btn-info btn-outline ${mail.folder === 'Trash' && 'btn-active'}`}>Trash</button>
        <button onClick={()=>{changeFolderHandler('Important'); close(false)}} className={`btn btn-success btn-outline ${mail.folder === 'Important' && 'btn-active'}`}>Important</button>
        <button onClick={()=>{changeFolderHandler(''); close(false)}} className={`btn btn-warning btn-outline ${mail.folder === '' && 'btn-active'}`}>All</button>
      </div>

    </div>
  );
};

export default EmailDetail;
