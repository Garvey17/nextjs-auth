"use client";
import React, {useEffect} from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function SignupPage() {
    const router = useRouter();

    const [buttonDisabled, setButtonDisabled] = React.useState(false);  

   
    // state to hold user data
    const  [user, setUser] = React.useState({
        username: '',
        email: '',
        password: ''
    });

    // useEffect to enable/disable button based on input fields
    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true)
            };
    }, [user])

    const [loading, setLoading] = React.useState(false);    

    // function to handle signup
    const onSignup = async () => {
        try {
            setLoading(true);
           const response = await axios.post("/api/users/signup", user)
           console.log("Signup successful", response.data);
           router.push("/login");
           
        } catch (error: any) {
            console.error("Signup failed", error.message);
            toast.error(error.message)
        }finally {
            setLoading(false);
        }
    }
    return (
       <div className='flex flex-col items-center justify-center min-h-screen py-2 bg-black'>
        <h1>{loading ? "proccessing " : "Signup"}</h1>
        <hr />

        <label htmlFor="username">username</label>
        <input className='p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white text-black'
        id='uesrname' 
        type="text"
        value={user.username}
        onChange={(e) => setUser({...user, username: e.target.value})}
        placeholder='username'
        />

        <label htmlFor="email">email</label>
        <input className='p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600  bg-white text-black'
        id='email' 
        type="text"
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder='email'
        />

        <label htmlFor="password">password</label>
        <input className='p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600  bg-white text-black'
        id='password' 
        type="password"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder='password'
        />

        <button className='bg-blue-500 text-white p-2 rounded-lg mb-4 hover:bg-blue-600'
        onClick={onSignup} 
        >{buttonDisabled? "No signup" : "Signup"}</button>
        <Link href="/login" className='text-blue-500 hover:underline'>Already have an account? Login</Link>
       </div>
    )
}