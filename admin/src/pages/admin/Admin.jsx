import React from 'react'
import './Admin.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { Routes,Route } from 'react-router-dom'
import Addproduct from '../../components/addproduct/Addproduct'
import Listproduct from '../../components/listproduct/Listproduct'
const admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/addproduct' element={<Addproduct/>} />
        <Route path='/listproduct' element={<Listproduct/>}/>
      </Routes>
    </div>
  )
}

export default admin
