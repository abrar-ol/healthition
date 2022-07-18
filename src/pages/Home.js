import React from 'react'
import Header from "../components/Header"
import Post from "../components/Post"
import { useEffect, useState } from 'react'
import axios from "axios";
import Logout from '../components/Logout'
import AddPostPage from '../pages/Post';
import { useNavigate } from 'react-router'

export default function Home() {
    const [posts, setPosts] = useState([]);
    const AuthStr = 'Bearer '.concat(localStorage.getItem('jwt'));
    const navigate = useNavigate();
    const WAIT_TIME = 100;

    const [data, setData] = useState('');

const childToParent = (childdata) => {
    setData(childdata);
}


    useEffect(() => {
            axios.get("https://localhost:44312/api/Post", { headers: { Authorization: AuthStr } })
            .then(res => {
                console.log(res);
                setPosts(res.data);
            })
            .catch(err => {console.log(err);
                if(err.message == "Request failed with status code 401")
                {
                 alert("Please signIn again!"); 
                 navigate('/');
               }
            });
      }, [data]); 

    // useEffect(() => {
    //     const id = setInterval(() => {
    //         axios.get("https://localhost:44312/api/Post", { headers: { Authorization: AuthStr } })
    //         .then(res => {
    //             setPosts(res.data);
    //         })
    //         .catch(err => {console.log(err);
    //             if(err.message == "Request failed with status code 401")
    //             {
    //              alert("Please signIn again!"); 
    //              navigate('/');
    //            }
    //         });
    //     }, WAIT_TIME);
    //     return () => clearInterval(id);
    //   }, [posts]); 

    return (
        <>
            <Header
                heading="Welcome To Healthition"
                paragraph="“Good health and good sense are two of life’s greatest blessings.”"
                linkName="Publilius Syrus"
                linkUrl="/home"
            />
            <Logout />
            <Post posts={posts} childToParent={childToParent}/>
           
            <AddPostPage childToParent={childToParent}/>
            

           


        </>

    )
}
