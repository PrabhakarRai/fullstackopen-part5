import React from 'react';
import Blog from './Blog';
import Login from './Login';
import Logout from './Logout';
import BlogCreateForm from './BlogCreateForm';

const Homepage = ({
  user,
  blogs,
  loginSubmitHandler,
  username,
  usernameHandler,
  password,
  passwordHandler,
  logoutHandler,
  author,
  title,
  url,
  authorHandler,
  titleHandler,
  urlHandler,
  blogSubmitHandler,
  }) => {
    if (user === null) {
      return (
        <>
        <h1>Login to the application</h1>
        <Login
          submitHandler={loginSubmitHandler}
          username={username}
          password={password}
          usernameHandler={usernameHandler}
          passwordHandler={passwordHandler}        
        />
        </>
      );
    }
    return (
      <div>
        <h2>Blogs</h2>
        <Logout user={user} logoutHandler={logoutHandler} />
        {blogs.map(blog =>
          <Blog key={blog.id} data={blog} />
        )}
        <h2>Add a Blog entry</h2>
        <BlogCreateForm
        author={author}
        title={title}
        url={url}
        authorHandler={authorHandler}
        titleHandler={titleHandler}
        urlHandler={urlHandler}
        submitHandler={blogSubmitHandler}
        />
      </div>
    );
}

export default Homepage;
