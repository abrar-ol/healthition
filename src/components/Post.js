import React, { useState } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router'

export default function Post({ posts, childToParent }) {
    const AuthStr = 'Bearer '.concat(localStorage.getItem('jwt'));
    const [postIsDeleted, setPostIsDeleted] = useState(false);
    const [postIsUpdated, setPostIsUpdated] = useState(false);

    const navigate = useNavigate()

    const [showModal, setShowModal] = useState(false);

    const [updatedPost,setupdatedPost] = useState({});
    const handleChange=(e)=>setupdatedPost({...updatedPost,[e.target.id]:e.target.value});

    const updatePost = () => { 
        console.log("updated Post: "+updatedPost.title +" ------ " + updatedPost.post);
        axios.put("http://localhost:44312/api/Post/" + updatedPost.id, updatedPost,{ headers: { Authorization: AuthStr } })
        .then(
            res => {
                console.log(res);
                setPostIsUpdated((prevState) => !prevState);
                childToParent(postIsUpdated);
            }
        ).catch(err => {
            console.log(err);
            // token expire?
            if (err.message == "Request failed with status code 401") {
                alert("Please signIn again");
                navigate('/');
            }
        })
    }

    const deletePost = (id) => {
        // console.log("onClick id: " + id);
        axios.delete("http://localhost:44312/api/Post/" + id, { headers: { Authorization: AuthStr } })
            .then(
                res => {
                    console.log(res);
                    setPostIsDeleted((prevState) => !prevState);
                    childToParent(postIsDeleted);
                }
            ).catch(err => {
                console.log(err);
                // token expire? 
                // but Conflict with other messages !!!!
                // if (err.message == "Request failed with status code 401") {
                //     alert("Please signIn again");
                //     navigate('/');
                // }
                localStorage.removeItem('jwt');
                localStorage.removeItem('currentUser');
                localStorage.removeItem('currentUserId');
                localStorage.removeItem('isAdmin');
        
                navigate("/");
            })
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
                                localStorage.getItem('isAdmin').toString().includes('t') &&
                                <button
                                    onClick={() => deletePost(post.id)} className="inline-flex space-x-2 items-center px-3 py-2 bg-rose-500 hover:bg-rose-800 rounded-md drop-shadow-md">
                                    <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20"
                                        viewBox="0 0 24 24">
                                        <path
                                            d="M 10 2 L 9 3 L 3 3 L 3 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 4.3652344 7 L 5.8925781 20.263672 C 6.0245781 21.253672 6.877 22 7.875 22 L 16.123047 22 C 17.121047 22 17.974422 21.254859 18.107422 20.255859 L 19.634766 7 L 4.3652344 7 z">
                                        </path>
                                    </svg>
                                </button>

                            }
                            { post.userId === localStorage.getItem("currentUserId") && <button
                                onClick={() => {setShowModal(true); setupdatedPost(post);}}
                                type="button"
                                className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-10">
                                Edit</button>}
                           
                            {showModal ? (
                                <>
                                    <div
                                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                                    >
                                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                            {/*content*/}
                                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                                {/*header*/}
                                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                    <h3 className="text-3xl font-semibold">
                                                        Edit Post
                                                    </h3>
                                                    <button
                                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                            ×
                                                        </span>
                                                    </button>
                                                </div>
                                                {/*body*/}
                                                <div className="relative p-6 flex-auto">
                                                    <div className="mb-6">
                                                        <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Post Title</label>
                                                        <input
                                                            type="text"
                                                            id="title"
                                                            onChange={handleChange}
                                                            placeholder={updatedPost.title}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                                    </div>
                                                    <label htmlFor="post" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your Post</label>
                                                    <textarea
                                                        id="post"
                                                        rows="4"
                                                        onChange={handleChange}
                                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                                        placeholder={updatedPost.post}></textarea>
                                                </div>
                                                {/*footer*/}
                                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                    <button
                                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={() => setShowModal(false)}
                                                    >
                                                        Close
                                                    </button>
                                                    <button
                                                        className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                        type="button"
                                                        onClick={() => { setShowModal(false); updatePost(post) }}
                                                    >
                                                        Save Changes
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                </>
                            ) : null}


                        </div>
                    );
                })
            }


        </>
    )
}
