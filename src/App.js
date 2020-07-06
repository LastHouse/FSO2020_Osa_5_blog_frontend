import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import AddBlog from './components/AddBlog';

const App = () => {
  const initialState = '';
  const [blogs, setBlogs] = useState([]);
  const [newTitle, setNewTitle] = useState(initialState);
  const [newAuthor, setNewAuthor] = useState(initialState);
  const [newUrl, setNewUrl] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState(initialState);
  const [password, setPassword] = useState(initialState);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('wrong username or password!');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser(initialState);
    setUsername(initialState);
    setPassword(initialState);
    window.localStorage.removeItem('loggedBlogappUser');
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

  const ErrorNotification = ({ message }) => {
    if (message === null) {
      return null;
    }

    return <div className="error">{message}</div>;
  };

  const SuccessNotification = ({ message }) => {
    if (message === null) {
      return null;
    }

    return <div className="success">{message}</div>;
  };

  const addBlog = (e) => {
    e.preventDefault();
    const newObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };

    blogService
      .create(newObject)
      .then((response) => {
        setBlogs([...blogs, response]);
        setMessage(`Added ${newTitle} by ${user.name}`);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
    setNewTitle(initialState);
    setNewAuthor(initialState);
    setNewUrl(initialState);
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <ErrorNotification message={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username:{' '}
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password:{' '}
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }
  return (
    <div>
      <h2>Blogs</h2>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={message} />
      <div>
        {user.name} logged in <button onClick={handleLogout}>Logout</button>
      </div>

      <br></br>
      <AddBlog
        addBlog={addBlog}
        newTitle={newTitle}
        newAuthor={newAuthor}
        newUrl={newUrl}
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleUrlChange={handleUrlChange}
      />
      <br></br>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
