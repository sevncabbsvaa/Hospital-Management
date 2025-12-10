import './App.css'
import MainLayout from './Layout/MainLayout';
import Login from './Pages/Login/Login'
import { Routes, Route } from "react-router-dom";
import Patients from './Pages/Patients/Patients';
import Doctors from './Pages/Doctors/Doctors';
import Appointments from './Pages/Appointments/Appointments';

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>

      <Route path='/main' element={<MainLayout/>}>
        <Route path='patients' element={<Patients/>}/>
        <Route path='doctors' element={<Doctors/>}/>
        <Route path='appointments' element={<Appointments/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App
