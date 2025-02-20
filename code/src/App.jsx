import { createBrowserRouter, RouterProvider } from 'react-router';
import Navbar from './comp/Navbar';
import Homepage from './comp/Homepage';
import ViewPaste from './comp/ViewPaste';
import Paste from './comp/Paste'; // Assuming this is the missing component

// Define the router with all routes
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div>
        <Navbar />
        <Homepage />
      </div>
    ),
  },
  {
    path: '/pastes',
    element: (
      <div>
        <Navbar />
        <Paste />
      </div>
    ),
  },
  {
    path: '/pastes/:id',
    element: (
      <div>
        <Navbar />
        <ViewPaste />
      </div>
    ),
  },
]);

function App() {
 
   return <RouterProvider router={router} />;
  
 
}

export default App;

