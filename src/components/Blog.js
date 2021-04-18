import React,  { useState } from 'react';
const Blog = ({ data, username, updateLikesHandler, deleteBlogHandler }) => {
  const [visible, setVisible] = useState(false);
  const [likeText, setLikeText] = useState('Like');

  const visibility = { display: visible ? '' : 'none' };
  const toggleText = visible ? 'hide' : 'view';

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };
  const handleToggleVisibility = () => {
    setVisible(!visible);
  };
  const handleLikeClick = (id, likes) => () => {
    if (likeText === 'Like') {
      updateLikesHandler(id, likes);
    }
    setLikeText('Liked');
  };
  const handleDeleteClick = (id) => () => {
    deleteBlogHandler(id);
  };
  return (
    <div style={blogStyle}>
      <span>{data.title} </span>
      <button onClick={handleToggleVisibility}>{toggleText}</button>
      <div style={visibility}>
        <span> URL ---: <a href={data.url} target={'_blank'} rel={'noreferrer'}>{data.url}</a></span><br />
        <span> Author : <i>{data.author}</i></span><br />
        <span> Likes -: <b>{data.likes}</b></span><br />
        <button onClick={handleLikeClick(data.id, data.likes + 1)}>{likeText}</button>
        {username === data.user.username ? <button onClick={handleDeleteClick(data.id)}>Delete</button> : ''}
      </div>
    </div>
  );
};

export default Blog;
