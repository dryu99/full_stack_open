import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    async function getAllBlogs() {
      const blogs = await blogService.getAll();
      setBlogs( blogs );    
    }
    getAllBlogs();
  }, [])

  // check if user data is available in cache
  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      setUser(JSON.parse(loggedInUserJSON));
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({username, password});
      
      // cache user data
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));

      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      alert('login failed, invalid username or password');
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem("loggedInUser");
    setUser(null);
  }

  const addNewBlog = async (event) => {
    event.preventDefault();
    try {
      const createdBlog = await blogService.create(newBlog, user.token);
      setBlogs(blogs.concat(createdBlog));
    } catch (exception) {
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>login to application</h2>
        <LoginForm 
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>

        <h2>create new</h2>
        <CreateBlogForm 
          newBlog={newBlog}
          setNewBlog={setNewBlog}
          addNewBlog={addNewBlog}
        />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
          )}
        <button onClick={handleLogout}>logout</button>
      </div>
    )
  }
}

export default App