import React from 'react';
import { useSelector } from 'react-redux';
import EmailCard from '../components/Email/EmailCard';


const Dashboard = ({ user }) => {
  const {userData} = useSelector(state=>state.UserReducer)
  const { allMail } = userData;

  // Calculate totals
  const totalReceived = allMail?.length;
  const totalFavorited = allMail?.filter(mail => mail?.isFav)?.length;
  const folders = {};

  allMail?.forEach(mail => {
    const folder = mail?.folder || 'None';
    if (!folders[folder]) {
      folders[folder] = 1;
    } else {
      folders[folder]++;
    }
  });

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Email Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Total Received</h2>
          <p className="text-3xl font-bold">{totalReceived}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Total Favorited</h2>
          <p className="text-3xl font-bold">{totalFavorited}</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">Folders</h2>
          <div className="divide-y divide-gray-200">
            {Object?.keys(folders)?.map(folder => (
              <div key={folder} className="py-2">
                <p className="text-lg">{folder}: {folders[folder]}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Received Emails</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allMail?.map(mail => (
            <EmailCard key={mail._id} mail={mail}  />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
