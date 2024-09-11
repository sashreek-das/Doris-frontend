import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Home } from './pages/Home'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import { NewTaskPage } from './pages/NewTaskPage'
import { YourTasks } from './pages/YourTasks'


function App() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900"> {/* Adjust the background based on the mode */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/newTaskPage' element={<NewTaskPage />} />
          <Route path='/yourTasks' element={<YourTasks />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
