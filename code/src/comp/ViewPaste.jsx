import React from 'react';
import { useParams } from 'react-router'; // Correctly using useParams
import { useSelector } from 'react-redux';

const ViewPaste = () => {
  const { id } = useParams(); // Extracting 'id' from useParams
  const allPaste = useSelector((state) => state.paste.pastes); // Getting all pastes from Redux state
  
  // Finding the paste by ID
  const paste = allPaste.find((p) => p._id === id);

  // If paste is not found, show an error message
  if (!paste) {
    return <p>Paste not found!</p>;
  }

  return (
    <div>
      <div className="flex flex-row gap-7">
        <input
          className="p-2 rounded-2xl mt-2 border"
          type="text"
          placeholder="Enter Title Here"
          value={paste.title}
          disabled
        />
      </div>
      <div className="mt-4">
        <textarea
          className="rounded-2xl mt-4 min-w-[400px] p-3.5 bg-blue-500 text-white"
          value={paste.content}
          disabled
          placeholder="Write your code snippet here"
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;
