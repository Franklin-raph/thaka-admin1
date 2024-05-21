import './App.css'
import SideNav from './components/sideNav/SideNav'
import { HashRouter, Routes, Route } from 'react-router-dom'
import TopNav from './components/topNav/TopNav'
import Settings from './pages/settings/Settings'
import Login from './pages/login/Login'
import Dashboard from './pages/dashboard/Dashboard'

function App() {

  // const baseUrl = 'https://cometake.pythonanywhere.com/administrator'
  const baseUrl = 'https://api.yamltech.com/administrator'
  const admin = JSON.parse(localStorage.getItem('admin'))

  return (
    <HashRouter>
      {admin && <TopNav />}
      <div className='flex items-center'>
        {admin && <SideNav />}
        <div className={admin ? `w-[85%] bg-[#f6f6f6] pt-[6rem] ml-auto px-[1.5rem] h-[100dvh]` : 'w-[100%]'}>
          <Routes>
            {
              !admin && <Route path='/' element={<Login baseUrl={baseUrl}/>}/>
            }
            <Route path='/settings' element={<Settings baseUrl={baseUrl}/>}/>
            <Route path='/dashboard' element={<Dashboard baseUrl={baseUrl}/>}/>
            {/* <Route path='/customer/:id' element={<SingleCustomer baseUrl={baseUrl}/>}/> */}
            {/* <Route path='/transactions' element={<Transactions baseUrl={baseUrl}/>}/> */}
          </Routes>
        </div>
      </div>
    </HashRouter>
  )
}

export default App