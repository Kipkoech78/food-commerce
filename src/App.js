import { createTheme, Paper, ThemeProvider } from '@mui/material';
import Home from '../src/components/Home'
import ReactDOM from 'react-dom/client';
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Authentication from './components/Authentication';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/formControl/Login';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Authentication />
    },
    {
      path: "/home",
      element: <Home />
    },
    {
      path:"/login",
      element: <Login />
    }
  ]);
  return (
    
 <div>
      {/* <Home />
      <Authentication /> */}
      <RouterProvider router={router} />
    </div>
  );
}
export default App;
