import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {
  const paste = useSelector((state) => state.paste?.pastes || []); // Accessing state
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const dispatch = useDispatch(); // Dispatch, if needed for future actions

  // Filtered data based on search term
  const filteredData = paste.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete functionality
  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }
  function handleShare(paste) {
    if (navigator.share) {
      navigator.share({
        title: paste.title,
        text: paste.content,
        url: `${window.location.origin}/pastes/${paste._id}`, 
      })
        .then(() => toast.success('Paste shared successfully!'))
        .catch((error) => toast.error('Failed to share paste.'));
    } else {
      toast.error('Sharing is not supported on this device.');
    }
  }


  return (
    <div>
      <input
        className="p-2 rounded-2xl min-w-[600px] mt-2 border"
        type="search"
        placeholder="Enter value"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 mt-4">
        {filteredData.length > 0 &&
          filteredData.map((paste) => {
            return (
              <div key={paste._id} className="border">
                <div className="flex flex-row gap-2 place-content-evenly mt-2">
                  {paste.title}
                </div>
                <div className="flex flex-row gap-2 place-content-evenly mt-2">
                  {paste.content}
                </div>
                <div className="flex flex-row gap-2 place-content-evenly mt-2">
                  <button>
                    <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                  </button>
                  <button>
                    <a href={`/pastes/${paste?._id}`}>View</a>
                  </button>

                  {/* Corrected Delete button */}
                  <button onClick={() => handleDelete(paste?._id)}>Delete</button>
                  <button onClick={() => {
                    navigator.clipboard.writeText(paste?.content)
                    toast.success('copied succesfully')
                  }}>Copy</button>
                  <button onClick={() => handleShare(paste)}>Share</button>
                </div>
                <div className="flex flex-row gap-2 place-content-evenly mt-2">
                  {paste.createdAt}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Paste;

