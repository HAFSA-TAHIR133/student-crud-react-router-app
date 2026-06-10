import { useState, useEffect } from 'react'
import './App.css'
import AddStudent from './components/addStudent.jsx'
import DisplayUser from './components/DisplayUser.jsx'
import SearchStudent from './components/searchStudent.jsx'
import UpdateRecord from './components/updateRecord.jsx'
import PageNotFound from './components/PageNotFound.jsx'
import ProtectedRoute from './components/protectedRoute.jsx'


import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom'

function Login({ setLoginState }) {

  const navigate = useNavigate();

  const handleLogin = () => {
    setLoginState(true);
    navigate('/system'); 
  }

  return (
    <div className="login-container">
      <h2>Please Login To Use The System</h2>
      <button onClick={handleLogin}>Click To Login</button>
    </div>
  );
}

//  STUDENT SYSTEM MAIN PAGE 
function HomePage() {
  return (
    <>
      <div className='homePage'>
          <h1>Welcome To Student Management System</h1>
      </div>
    </>
  );
}

// APP COMPONENT
function App() {

  const [login, setLoginState] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [student, setStudent] = useState([
    { id: 1, rollNo: 'SWEN231101054', name: 'Hafsa Tahir', department: 'Computer & Software Engineering', batch: '2023-2027' },
    { id: 2, rollNo: 'SWEN231101076', name: 'Sumaira Zahid', department: 'Computer & Software Engineering', batch: '2023-2027' }
  ]);
  useEffect(() => {
    localStorage.setItem("studentList", JSON.stringify(student));
  }, []);
  useEffect(() => {
    localStorage.setItem("studentList", JSON.stringify(student));
  }, [student]);
  //set the login status
  useEffect(() => {
    localStorage.setItem("isLoggedIn", login);
  }, [login]);

  return (
    <> 
      {login && (
        <nav className='navbar'>
          <Link to="/system">Dashboard</Link>
          <Link to="/showStudents">Display Records</Link>
          <Link to="/addStudent">Add New Record</Link>
          <Link to="/searchStudent">Search Record</Link>

          <Link to="/login" onClick={() => setLoginState(false)}>Logout</Link>

        </nav>
      )}
      <Routes>
        <Route path='/' element={<Navigate to="/login" />} />
      
        <Route path='/login' element={<Login setLoginState={setLoginState} />} />

        <Route path='/showStudents' element={< ProtectedRoute login={login}>
          < DisplayUser  student={student} setStudent={setStudent} />
        </ProtectedRoute>} />
        
        <Route path='/addStudent' element={<ProtectedRoute login={login}>
          <AddStudent student={student} setStudent={setStudent} />
          </ProtectedRoute>} />
        
        <Route path='/searchStudent' element={<ProtectedRoute login={login}>
          <SearchStudent student={student} /> 
          </ProtectedRoute>} />
        <Route path='/updateStudent/:id' element={<ProtectedRoute login={login}>
          <UpdateRecord student={student} setStudent={setStudent} />
          </ProtectedRoute>} />

        <Route path='/system'  element={<ProtectedRoute login={login}>
          <HomePage />
          </ProtectedRoute>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default App;