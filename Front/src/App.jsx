import { useState } from 'react'
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import AddTaskPage from "./pages/AddTaskpage"; 

function App() {
    return (
        <>
        <Routes>
            <Route path="" element={<Navigate to="/tasks" />} />
            <Route path="/tasks/new" element={<AddTaskPage />} /> 
        </Routes>
        </>
    )


}
export default App
