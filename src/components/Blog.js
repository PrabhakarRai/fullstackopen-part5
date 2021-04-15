import React from 'react'
const Blog = ({ data }) => (
  <div>
    <a href={data.url} target={'_blank'} rel={'noreferrer'}>{data.title}</a>
    <span> by </span>
    <i>{data.author}</i>
    <span> [Total Likes: <b>{data.likes}</b>]</span>
  </div>
);

export default Blog;