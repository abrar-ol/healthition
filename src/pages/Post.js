import React ,{useEffect, useState} from 'react'
import axios from "axios";
import { useNavigate } from 'react-router'

function Post({childToParent}) {
    const [showModal, setShowModal] = useState(false);
    const [post,setPost] = useState({});
    const handleChange=(e)=>setPost({...post,[e.target.id]:e.target.value});
    const navigate = useNavigate()
    const AuthStr = 'Bearer '.concat(localStorage.getItem('jwt'));
    const [postIsAdded,setPostIsAdded]= useState(false);

    useEffect(() => {
      
        setPost({...post,userId:localStorage.getItem("currentUserId")})

    }, [])
    
    const addPost=()=>{
       
        axios.post("http://localhost:44312/api/Post", post,{ headers: { Authorization: AuthStr } })
        .then(res=>{
            console.log(res);
            setPostIsAdded((prevState) => !prevState);
            childToParent(postIsAdded);
            //navigate('/home');
        })
        .catch(err=>{
          console.log(err);
        // token expire?
        if(err.message == "Request failed with status code 401")
         {
          alert("Please signIn again"); 
          navigate('/');
        }
        });
    }
  return (
    <>
      <button
        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        type="button"
        onClick={() => setShowModal(true)}
      >
        New Post
      </button>
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
                    Add New Post
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <label htmlFor="post" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your Post</label>
            <textarea 
            id="post" 
            rows="4" 
            onChange={handleChange} 
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a Post..."></textarea>
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
                    onClick={() => {setShowModal(false);addPost()}}
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
    </>
  );
  
}

export default Post