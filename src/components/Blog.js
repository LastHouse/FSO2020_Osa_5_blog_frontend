import React from 'react';
import Togglable from './Togglable';
//import PropTypes from 'prop-types';

const Blog = ({ blog, likeBlog, delBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const addLike = () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    likeBlog(blog.id, likedBlog);
  };

  return (
    <div>
      {user === null ? (
        <div style={blogStyle}>
          {blog.title} by {blog.author}
          <Togglable buttonLabel="show more">
            <div>
              url: {blog.url}
              <br></br>
              likes: {blog.likes}
              <br></br>
              added by: {blog.user.name}
              <br></br>
            </div>
          </Togglable>
        </div>
      ) : (
        <div style={blogStyle}>
          {blog.title} by {blog.author}
          <Togglable buttonLabel="show more">
            <div>
              url: {blog.url}
              <br></br>
              likes: {blog.likes}{' '}
              <button id="like-button" onClick={addLike}>
                like
              </button>
              <br></br>
              added by: {blog.user.name}
              <br></br>
              {user.name !== blog.user.name ? (
                ''
              ) : (
                <div>
                  <br></br>
                  <button
                    id="remove-button"
                    onClick={() => delBlog(blog.id, blog.title)}
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </Togglable>
        </div>
      )}
    </div>
  );
};

/* Blog.propTypes = {
  likeBlog: PropTypes.func.isRequired,
  delBlog: PropTypes.func.isRequired,
}; */

export default Blog;
