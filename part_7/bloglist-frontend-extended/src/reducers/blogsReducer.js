import blogService from '../services/blogs';

const blogsReducer = (state=[], action) => {
  switch (action.type) {
  case 'INIT_BLOGS': {
    return action.data;
  }
  case 'ADD_BLOG': {
    return state.concat(action.data);
  }
  case 'UPDATE_BLOG': {
    return state.map(blog =>
      blog.id === action.data.id
        ? action.data.updatedBlog
        : blog
    );
  }
  case 'REMOVE_BLOG': {
    return state.filter(blog =>
      blog.id !== action.data.id
    );
  }
  default: {
    return state;
  }
  }
};

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    });
  };
};

export const addBlog = (blogData) => {
  return async (dispatch) => {
    const addedBlog = await blogService.create(blogData);

    dispatch({
      type: 'ADD_BLOG',
      data: addedBlog
    });
  };
};

export const updateBlog = (blogData, id) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blogData, id);

    dispatch({
      type: 'UPDATE_BLOG',
      data: { id, updatedBlog }
    });
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);

    dispatch({
      type: 'REMOVE_BLOG',
      data: { id }
    });
  };
};

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.comment(id, comment);

    dispatch({
      type: 'UPDATE_BLOG',
      data: { id, updatedBlog }
    });
  };
};


export default blogsReducer;