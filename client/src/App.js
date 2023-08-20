import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import Login from './pages/Login';



function App() {

  return (

    <>

    <Routes>
      <Route path='/' element={ <ProtectedRoutes> <HomePage /> </ProtectedRoutes> } />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='/login' element={<Login />} />
    </Routes>
    
    </>

  );
}

export function ProtectedRoutes(props){
  // const navigate = useNavigate();

  if(localStorage.getItem('user')){
    return props.children;
  }else {
    // return navigate('/login');
    return <Navigate to='/login' />;
    
  }
}

export default App;
