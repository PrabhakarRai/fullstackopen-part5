import React, { useState, useEffect, useRef } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import messages from './components/Message';
import Blog from './components/Blog';
import Login from './components/Login';
import Logout from './components/Logout';
import Toggleable from './components/Toggleable';
import BlogCreateForm from './components/BlogCreateForm';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const blogFormRef = useRef();

  const setSuccessMsgWrapper = (msg, clearTime = 3000) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), clearTime);
  };

  const setErrorMsgWrapper = (msg, clearTime = 3000) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(null), clearTime);
  };

  useEffect(() => {
    const fetchInitialBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    };
    fetchInitialBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedInBlogUser');
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginSubmitHandler = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem(
        'loggedInBlogUser', JSON.stringify(user)
      );
      setSuccessMsgWrapper('Logged in Successfully');
      setUser(user);
    } catch (e) {
      setErrorMsgWrapper('Login Error - incorrect username or password');
    }
  };
  const blogSubmitHandler = async (author, title, url) => {
    try {
      const res = await blogService.createBlog({ author, title, url });
      setBlogs(blogs.concat(res));
      setSuccessMsgWrapper(`Added - ${res.title} into blogs list.`);
      blogFormRef.current.toggleVisibility();
    } catch (e) {
      setErrorMsgWrapper(e.message);
    }
  };
  const updateLikesHandler = async (id, likes) => {
    try {
      const res = await blogService.updateLikes(id, likes);
      const newBlogs = blogs.map(b => b.id !== res.id ? b : res).sort((a, b) => {
        return b.likes - a.likes;
      });
      setBlogs(newBlogs);
      setSuccessMsgWrapper(`Liked ${res.title} by ${res.author}`);
    } catch (e) {
      setErrorMsgWrapper(e.message);
    }
  };
  const deleteBlogPost = async (id) => {
    try {
      const blog = blogs.find((b) => b.id === id);
      if (blog) {
        const conf = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
        if (conf) {
          const res = await blogService.deleteBlog(id);
          if (res.status === 204) {
            setBlogs(blogs.filter((b) => b.id !== id));
            setSuccessMsgWrapper(`Deleted ${blog.title}`);
          } else {
            setErrorMsgWrapper('Unknown error');
          }
        }
      }
    } catch (e) {
      setErrorMsgWrapper(e.message);
    }
  };
  const logoutHandler = () => {
    window.localStorage.removeItem('loggedInBlogUser');
    blogService.setToken(null);
    setUser(null);
    setSuccessMsgWrapper('Logged out successfully');
  };
  if (user === null) {
    return (
      <>
        <messages.ErrorMessage msg={errorMsg} />
        <messages.SuccessMessage msg={successMsg} />
        <h1>Login to the application</h1>
        <Login
          formSubmitHandler={loginSubmitHandler}
        />
      </>
    );
  }
  return (
    <div>
      <messages.ErrorMessage msg={errorMsg} />
      <messages.SuccessMessage msg={successMsg} />
      <h2>Blogs</h2>
      <Logout user={user} logoutHandler={logoutHandler} />
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          data={blog}
          updateLikesHandler={updateLikesHandler}
          deleteBlogHandler={deleteBlogPost}
          username={user.username}
        />
      )}
      <Toggleable buttonLable='Add New Blog' ref={blogFormRef}>
        <BlogCreateForm
          formSubmitHandler={blogSubmitHandler}
        />
      </Toggleable>
    </div>
  );
};

export default App;