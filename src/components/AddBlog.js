import React, { useState } from 'react';

const AddBlog = ({ createBlog }) => {
  const initialState = '';
  const [newTitle, setNewTitle] = useState(initialState);
  const [newAuthor, setNewAuthor] = useState(initialState);
  const [newUrl, setNewUrl] = useState(initialState);

  const addBlog = (e) => {
    e.preventDefault();
    const newObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };
    createBlog(newObject);
    setNewTitle(initialState);
    setNewAuthor(initialState);
    setNewUrl(initialState);
  };

  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };
  const handleAuthorChange = (e) => {
    setNewAuthor(e.target.value);
  };
  const handleUrlChange = (e) => {
    setNewUrl(e.target.value);
  };

  return (
    <div className="newBlogForm">
      {' '}
      <form onSubmit={addBlog}>
        <h2>Add new</h2>
        <div>
          title:{' '}
          <input
            id="title"
            type="text"
            name="title"
            value={newTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:{' '}
          <input
            id="author"
            type="text"
            name="author"
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:{' '}
          <input
            id="url"
            type="text"
            name="url"
            value={newUrl}
            onChange={handleUrlChange}
          />
        </div>{' '}
        <div>
          <br></br>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};
export default AddBlog;
