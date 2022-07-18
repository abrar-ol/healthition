import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router'

export default function Post({ posts, childToParent }) {
    const AuthStr = 'Bearer '.concat(localStorage.getItem('jwt'));
    const [postIsDeleted, setPostIsDeleted] = useState(false);
    const navigate = useNavigate()

    const updatePost=()=>{}

    const deletePost = (id) => {
       // console.log("onClick id: " + id);
        axios.delete("https://localhost:44312/api/Post/" + id, { headers: { Authorization: AuthStr } })
            .then(
                res => {
                    console.log(res);
                    setPostIsDeleted((prevState) => !prevState);
                    childToParent(postIsDeleted);
                }
            ).catch(err => {
                console.log(err);
                // token expire?
                if (err.message == "Request failed with status code 401") {
                    alert("Please signIn again");
                    navigate('/');
                }
            }
            )
    }

    return (
        <>
            {
                posts.map((post) => {
                    return (
                        <div key={post.id} className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <a link="#">
                                <h5
                                    className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {post.title}
                                </h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {post.post}</p>

                            {
                            localStorage.getItem('isAdmin').toString().includes('t')&&
                            <button
                            onClick={()=>deletePost(post.id)} className="inline-flex space-x-2 items-center px-3 py-2 bg-rose-500 hover:bg-rose-800 rounded-md drop-shadow-md">
                                <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z">
                                    </path>
                                </svg>
                            </button>
                        }
                        <button
                            onClick={()=>updatePost(post.id)} className="inline-flex space-x-2 items-center px-3 py-2 bg-rose-500 hover:bg-rose-800 rounded-md drop-shadow-md">
                                <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z">
                                    </path>
                                </svg>
                            </button>
                            
                        </div>
                    );
                })
            }


        </>
    )
}
