import React from 'react';

const EmailCard = ({ mail }) => {
  const { subject, mailBody, date, folder } = mail;

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-semibold mb-2">{subject}</h3>
      <p className="text-gray-600 mb-2">Folder: {folder || 'None'}</p>
      <p className="text-gray-600 mb-2">Received on: {new Date(date).toLocaleDateString()}</p>
      <div className="text-gray-800">
        {/* Render mailBody as HTML */}
        <div dangerouslySetInnerHTML={{ __html: mailBody }} />
      </div>
    </div>
  );
};

export default EmailCard;
