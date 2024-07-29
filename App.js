// import logo from './logo.svg';
// import './App.css';

// import Form from './form';
// import Home from './home';
// import { Router } from 'react-router-dom';
import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import Navbar from './component/navbar';
import { useLocalStorage } from './component/useLocalStorage';

const App = () =>{
  const [users, setUsers] = useLocalStorage('users', []);
 
  const addUser = user => {
    const newUser = { ...user, key: Date.now() };
    setUsers([...users, newUser]);
  };
  
  return (
    <BrowserRouter>
        <Navbar/>
    </BrowserRouter>
   
  )
}
export default App;
