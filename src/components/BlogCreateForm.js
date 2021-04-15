import React from 'react';

const BlogCreateForm = ({
  author,
  title,
  url,
  authorHandler,
  titleHandler,
  urlHandler,
  submitHandler,
}) => {
  return (
    <form onSubmit={submitHandler}>
    <div>
      <label htmlFor={"author"}>Author : </label>
      <input type="text" value={author} id={"author"} name="author" onChange={authorHandler} />
    </div>
    <div>
      <label htmlFor={"title"}>Title : </label>
      <input type="text" value={title} id={"title"} name="title" onChange={titleHandler} />
    </div>
    <div>
      <label htmlFor={"url"}>Url : </label>
      <input type="url" value={url} id={"url"} name="url" onChange={urlHandler} />
    </div>
    <button type="submit">Add Note</button>
    </form>
  )
};

export default BlogCreateForm;