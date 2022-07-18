import React from 'react'
import { useNavigate } from 'react-router'

export default function Logout() {
    const navigate = useNavigate()

    const logMeOut=()=>{
        localStorage.removeItem('jwt');
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserId');
        localStorage.removeItem('isAdmin');

        navigate("/");
    }
    return (
        <button onClick={logMeOut} className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
            Logout
        </button>
    )
}
