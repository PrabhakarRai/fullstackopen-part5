import React from 'react';

const Logout = ({ user, logoutHandler }) => (
  <>
  <p>{user.name} logged in. </p>
  <button onClick={logoutHandler}>logout</button>
  </>
);

export default Logout;