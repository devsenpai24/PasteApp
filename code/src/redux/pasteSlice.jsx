import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes:localStorage.getItem("pastes")
  ? JSON.parse(localStorage.getItem("pastes"))
  :[]
}

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state,action) => {
     const paste=action.payload;
     state.pastes.push(paste);
     localStorage.setItem('pastes',
      JSON.stringify(state.pastes));
     toast("paste created succesfully")
     
    },
    updateToPaste : (state,action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem('pastes', JSON.stringify(state.pastes));
        toast.success('Paste updated successfully!');
      } else {
        toast.error('Paste not found!');
      }
     
    },
    resetAllPastet: (state, action) => {
      state.pastes = [];
      localStorage.removeItem('pastes');
      toast.success('All pastes have been cleared!');
     
    },
    removeFromPastes:(state,action)=>{
      const pasteId = action.payload; // Expecting pasteId as payload
      const index = state.pastes.findIndex((item) => item._id === pasteId); // Find index of the paste
    
      if (index >= 0) {
        state.pastes.splice(index, 1); // Remove the paste from the array
        localStorage.setItem('pastes', JSON.stringify(state.pastes)); // Update localStorage
        toast.success('Paste deleted successfully!');
      } else {
        toast.error('Paste not found!');
      }
      

    },
  },
})


export const {addToPastes,updateToPaste,resetAllPastet,removeFromPastes } = pasteSlice.actions

export default pasteSlice.reducer