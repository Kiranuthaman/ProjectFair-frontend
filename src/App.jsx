
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import PagenotFound from './pages/PagenotFound'
import Project from './pages/Project'
import './App.css'
import Footer from './components/Footer'
import { useContext } from 'react'
import { lodingResponseContext } from './context/ContextShare'

function App() {
  const {loginResponse} = useContext(lodingResponseContext)


  return (
    <>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/projects' element={ loginResponse? <Project/> : <PagenotFound/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth register = {true} />}/>
      <Route path='/dashboard' element={  loginResponse?   <Dashboard/>: <PagenotFound/> }/>
      <Route path='*' element={<PagenotFound/>}/>
     </Routes>
     <Footer/>
    </>
  )
}

export default App
