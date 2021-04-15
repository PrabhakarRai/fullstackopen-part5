import React from 'react';

const ErrorMessage = ({ msg }) => {
  if (msg === null) {
    return null
  }
  return (
    <div className="error">
      {msg}
    </div>
  )
};


const SuccessMessage = ({ msg }) => {
  if (msg === null) {
    return null
  }
  return (
    <div className="success">
      {msg}
    </div>
  )
};

const exportList = { ErrorMessage, SuccessMessage };

export default exportList;