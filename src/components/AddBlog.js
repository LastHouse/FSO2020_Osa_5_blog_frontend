import React from 'react';

const AddBlog = ({
  addBlog,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  newTitle,
  newAuthor,
  newUrl,
}) => {
  return (
    <div>
      {' '}
      <form onSubmit={addBlog}>
        <h2>Add new</h2>
        <div>
          title:{' '}
          <input
            type="text"
            name="title"
            value={newTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author:{' '}
          <input
            type="text"
            name="author"
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url:{' '}
          <input
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
