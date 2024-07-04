import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../helper/config/axiosInstance';
import { fetchUserDetails } from '../../store/action/userAction';
import EmailDetail from './EmailDetail';

const EmailList = () => {
  const { userData } = useSelector(state => state.UserReducer);
  const [selectedTab, setSelectedTab] = useState('all'); // 'all', 'send', 'received'
  const [emails, setEmails] = useState([]);
  const [isMailOpen, setIsMailOpen] = useState(false);
  const [isFolderOpen, setIsFolderOpen] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    fetchEmails();
  }, [userData, selectedTab]);

  const fetchEmails = async () => {
    try {
      let emailsData = [...userData?.allMail];

      
      setEmails(emailsData?.reverse());
    } catch (error) {
      console.error('Error fetching emails:', error);
    }
  };

  const isFavHandler = async(id)=>{
    try {
      const {data} =  await axiosInstance.put(`/auth/user/${userData._id}/mail/${id}/isFav`);
      console.log(data)
      dispatch(fetchUserDetails())
    } catch (error) {
      console.log(error)
    }
  }

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold mb-6">Email History</h2>
      <div className='w-full border p-4 flex flex-wrap gap-2 items-center justify-center '>
        
        <button onClick={()=>setIsFolderOpen('Spam')} className={`btn btn-error btn-outline ${isFolderOpen === 'Spam' && 'btn-active'}`}>Spam</button>
        <button onClick={()=>setIsFolderOpen('Trash')} className={`btn btn-info btn-outline ${isFolderOpen === 'Trash' && 'btn-active'}`}>Trash</button>
        <button onClick={()=>setIsFolderOpen('Important')} className={`btn btn-success btn-outline ${isFolderOpen === 'Important' && 'btn-active'}`}>Important</button>
        <button onClick={()=>setIsFolderOpen('')} className={`btn btn-warning btn-outline ${isFolderOpen === '' && 'btn-active'}`}>All</button>
      </div>
      <div role="tablist" className="flex justify-center w-full tabs tabs-lifted">
        {['Received', 'All', 'Send'].map((option) => (
          <button
            key={option} role="tab"
            onClick={() => handleTabChange(option.toLowerCase())}
            className={` tab ${
              selectedTab === option.toLowerCase()
                ? ' tab-active border-blue-500 border-t-2'
                : ''
            }`}
          >
            {option} Mail
          </button>
        ))}
      </div>
      <div className="overflow-hidden rounded-lg shadow-lg">
        <ul className="divide-y divide-gray-200">
          {emails?.map((email) => {
            let isTrue= false
            if (email.sender === userData.email && selectedTab === 'send') {
              isTrue = true
            }
            if (email.receiver === userData.email && selectedTab === 'received') {
              isTrue = true
            }
            if ( selectedTab === 'all') {
              isTrue = true
            }
            if(isTrue && (isFolderOpen === email.folder || isFolderOpen === '')){
              return(
                <li  key={email?._id} className="px-2 py-1 mb-2 rounded-md hover:shadow-md hover:bg-gray-200 relative">
                  <div onClick={()=>setIsMailOpen(email)} data-tip="Open" className="mb-2 cursor-pointer tooltip-top">
                    <h3 className="text-lg font-semibold">{email?.subject}</h3>
                    <p className="text-sm hidden text-gray-600">
                      {email?.mailBody?.length > 100
                        ? `${email?.mailBody.substring(0, 100)}...`
                        : email?.mailBody}
                    </p>
                  </div>
                  <div onClick={()=>setIsMailOpen(email)} className="flex justify-between text-sm text-gray-500">
                    <span>{new Date(email?.date).toLocaleString()}</span>
                    <span>{selectedTab === 'send' ? 'To: ' : 'From: '}{email?.sender?.email || 'Xyz'}</span>
                  </div>
                  <svg onClick={()=>isFavHandler(email?._id)} className={`absolute top-2 right-2 w-5 h-5 cursor-pointer  ${email.isFav ? 'text-yellow-500' :'text-gray-400 '}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z" /></svg>
    
                </li>
              )
            }
          })}
        </ul>
      </div>
      {isMailOpen && <div className='fixed top-0 left-0 z-40 bg-black bg-opacity-65 w-full h-screen flex items-center justify-center p-3'>
        <div className='w-fit p-2 bg-white rounded-md shadow-md relative flex items-center justify-center'>
          <button onClick={()=>setIsMailOpen(false)} className='btn btn-xs text-red-500 absolute top-2 right-2'>Close</button>
        <EmailDetail close={setIsMailOpen} mail={isMailOpen} userData={userData} />
        </div>
        </div>}
    </div>
  );
};

export default EmailList;
