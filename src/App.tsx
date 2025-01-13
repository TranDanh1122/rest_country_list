
import './App.css'
import Layout from './layout/Layout'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Detail from './pages/Detail'
function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route element={<Home />} path='/' index></Route>
          <Route element={<Detail />} path='/:country'></Route>
        </Routes>
      </Layout>
    </>
  )
}

export default App
