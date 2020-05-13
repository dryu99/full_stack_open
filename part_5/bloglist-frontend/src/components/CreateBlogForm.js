import React from 'react'

const CreateBlogForm = ({newBlog, setNewBlog, addNewBlog}) => {

  return (
    <form onSubmit={addNewBlog}>
      <div>
        title:
        <input 
          value={newBlog.title}
          onChange={({target}) => setNewBlog({...newBlog, title: target.value})}>
        </input>
      </div>          
      <div>
        author:
        <input 
          value={newBlog.author}
          onChange={({target}) => setNewBlog({...newBlog, author: target.value})}>
        </input>
      </div>
      <div>
        url:
        <input 
          value={newBlog.url}
          onChange={({target}) => setNewBlog({...newBlog, url: target.value})}>
        </input>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default CreateBlogForm;