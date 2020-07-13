import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import AddBlog from './components/AddBlog';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const initialState = '';
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [username, setUsername] = useState(initialState);
  const [password, setPassword] = useState(initialState);
  const [user, setUser] = useState(null);
  const addBlogRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [user]);

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
      setUsername(initialState);
      setPassword(initialState);
    } catch (exception) {
      setErrorMessage('wrong username or password!');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  // MUUTA LOGIIKKA

  const handleLogout = () => {
    setUser(null);
    setUsername(initialState);
    setPassword(initialState);
    window.localStorage.removeItem('loggedBlogappUser');
    blogService.getAll().then((blogs) => setBlogs(blogs));
    console.log(user);
  };

  const addBlog = (newObject) => {
    addBlogRef.current.toggleVisibility();
    blogService
      .create(newObject)
      .then((response) => {
        setBlogs([...blogs, response]);
        setMessage(`${user.name} added a new blog`);
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
  };

  const likeBlog = (id, newObject) => {
    blogService
      .like(id, newObject)
      .then((response) => {
        setBlogs(blogs.map((item) => (item.id !== id ? item : response)));
        console.log(response);
        setMessage(`${user.name} ladded a new like`);
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
  };

  const delBlog = (id, title) => {
    if (
      window.confirm(`Do you really want to delete ${title} from the list?`)
    ) {
      blogService
        .deleteBlog(id)
        .then(() => {
          setMessage(`the blog ${title} was deleted from server`);
          setTimeout(() => {
            setMessage(null);
          }, 5000);
          setBlogs(blogs.filter((n) => n.id !== id));
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
          setBlogs(blogs.filter((n) => n.id !== id));
        });
    }
  };

  const loginForm = () => (
    <div>
      <Togglable buttonLabel="login">
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      </Togglable>
    </div>
  );

  const blogForm = () => (
    <div>
      <br></br>
      <Togglable buttonLabel="new blog" ref={addBlogRef}>
        <br></br>
        <AddBlog createBlog={addBlog} user={user} />
      </Togglable>
    </div>
  );

  const sortedBlogs = blogs.sort(function (a, b) {
    return b.likes - a.likes;
  });

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} />
      <Notification message={message} />

      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>logged in as {user.name}</p>
          <button onClick={handleLogout}>Logout</button>
          <br></br>
          {blogForm()}
        </div>
      )}
      <ul>
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            delBlog={delBlog}
            user={user}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
