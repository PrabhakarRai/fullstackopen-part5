import React from 'react';
import Blog from './Blog';
import Login from './Login';
import Logout from './Logout';

const Homepage = ({
  user,
  blogs,
  submitHandler,
  username,
  usernameHandler,
  password,
  passwordHandler,
  logoutHandler,
  }) => {
    if (user === null) {
      return (
        <>
        <h1>Login to the application</h1>
        <Login
          submitHandler={submitHandler}
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
      </div>
    );
}

export default Homepage;
