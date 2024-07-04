import React, { useState } from 'react';
import axios from 'axios'; // Assuming you use Axios for HTTP requests
import axiosInstance from '../../helper/config/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserDetails } from '../../store/action/userAction';
import { useNavigate } from 'react-router-dom';

const ComposeEmail = () => {
  const {userData} = useSelector(state=>state.UserReducer);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // console.log(userData)
  const [formData, setFormData] = useState({
    sender: userData?.email,
    receiver: '',
    subject: '',
    // cc: '',
    mailBody: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data to backend (example using Axios)
      const response = await axiosInstance.post(`/auth/user/${userData._id}/mail/sent`, formData);
      console.log('Form submitted:', response.data);
      dispatch(fetchUserDetails())
      navigate('/mails')
      setFormData({
    sender: userData?.email,
    receiver: '',
    subject: '',
    // cc: '',
    mailBody: '',
  })
      // Handle success
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle error
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4">New Communication</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="sender" className="block text-sm font-medium text-gray-700">Sender</label>
          <input type="text" disabled id="sender" name="sender" value={formData.sender} onChange={handleChange} className="mt-1 px-3 py-2 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <div className="mb-4">
          <label htmlFor="receiver" className="block text-sm font-medium text-gray-700">Receiver</label>
          <input type="text" id="receiver" name="receiver" value={formData.receiver} onChange={handleChange} className="mt-1 px-3 py-2 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm " />
        </div>
        <div className="mb-4">
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
          <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} className="mt-1 px-3 py-2 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm " />
        </div>
        {/* <div className="mb-4">
          <label htmlFor="cc" className="block text-sm font-medium text-gray-700">CC</label>
          <input type="text" id="cc" name="cc" value={formData.cc} onChange={handleChange} className="mt-1 px-3 py-2 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm " />
        </div> */}
        <div className="mb-4">
          <label htmlFor="mailBody" className="block text-sm font-medium text-gray-700">Mail Body</label>
          <textarea id="mailBody" name="mailBody" value={formData.mailBody} onChange={handleChange} rows="4" className="mt-1 px-3 py-2 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "></textarea>
        </div>
        {/* <div className="mb-4">
          <label htmlFor="folder" className="block text-sm font-medium text-gray-700">Folder</label>
          <select id="folder" name="folder" value={formData.folder} onChange={handleChange} className="mt-1 px-3 py-2 block w-full border border-gray-500 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ">
            <option value="None">None</option>
            <option value="Spam">Spam</option>
            <option value="Trash">Trash</option>
            <option value="Important">Important</option>
          </select>
        </div> */}
        {/* <div className="mb-4">
          <label htmlFor="isFav" className="flex items-center">
            <input type="checkbox" id="isFav" name="isFav" checked={formData.isFav} onChange={handleChange} className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
            <span className="ml-2 text-sm text-gray-600">Mark as Favorite</span>
          </label>
        </div> */}
        <div className="flex justify-end">
          <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ComposeEmail;
