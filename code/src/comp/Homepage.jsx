import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPaste } from '../redux/pasteSlice';


const Homepage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchParams,setSearchParams] = useSearchParams();
  const [value, setValue] = useState('');
  const pasteId = searchParams.get('pasteId');
  const allPaste=useSelector((state)=>state.paste.pastes);

  const dispatch = useDispatch();

  useEffect(() => {
    if (pasteId && allPaste.length > 0) {
      const paste = allPaste.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      } else {
        console.warn('No paste found with the given ID:', pasteId);
      }
    }
  }, [pasteId, allPaste]);
  

  function createPaste() {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

  


    if (pasteId) {
      dispatch(updateToPaste(paste))
    } else {
      dispatch(addToPastes(paste))
    }
    setTitle('');
    setValue('');
    searchParams({});
    
  }

  return (
    <div>
      <div className="flex flex-row gap-7">
        <input
          className="p-2 rounded-2xl mt-2 border"
          type="text"
          placeholder="Enter Title Here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createPaste}
          className="p-2 rounded-2xl mt-2 bg-blue-500 text-white"
        >
          {pasteId ? 'Update Paste' : 'Create My Paste'}
        </button>
      </div>
      <div className="mt-4">
        <textarea
          className="rounded-2xl mt-4 min-w-[400px] p-3.5 bg-blue-500 text-white"
          value={value}
          placeholder="Write your code snippet here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Homepage;
