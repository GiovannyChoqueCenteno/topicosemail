import {Routes , Route , BrowserRouter } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage';
import ConfirmPage from './pages/ConfirmPage';
import Formulario from './components/layout/Formulario';
import './App.css'
import DashboardPage from './pages/DashboardPage';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { AppDispatch } from './store';
import { useDispatch } from 'react-redux';
import { setAuth } from './store/slices/authSlice';

const App  = ()=>{
  const dispatch : AppDispatch = useDispatch()
  useEffect(()=>{
    if(localStorage.getItem("token")){
      console.log("Si tengo token")
      dispatch(setAuth( localStorage.getItem("token")) )
    }
  },[localStorage])
  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route element={ <Formulario />}>
        <Route  path='/' element={ <RegisterPage /> }/>
        <Route  path='/confirm' element={<ConfirmPage />}  />
        <Route path='/dashboard' element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer
      position='top-right'
      autoClose={3000}
    />
    </>
  )
}

export default App;