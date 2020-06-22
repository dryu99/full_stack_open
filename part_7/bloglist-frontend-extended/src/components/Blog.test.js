import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;
  const mockLikeHandler = jest.fn();
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 9,
  };


  beforeEach(() => {
    component = render(
      <Blog blog={blog} updateBlog={mockLikeHandler}/>
    );
  });

  test('initial render only displays default title and author info', () => {
    const defaultDiv = component.container.querySelector('.default-view');
    expect(defaultDiv).not.toHaveStyle('display: none');
    expect(defaultDiv).toHaveTextContent('test title');
    expect(defaultDiv).toHaveTextContent('test author');

    const detailedDiv = component.container.querySelector('.detailed-view');
    expect(detailedDiv).toHaveStyle('display: none');
  });

  test('clicking view button displays url and likes info', () => {
    const detailedDiv = component.container.querySelector('.detailed-view');
    expect(detailedDiv).toHaveStyle('display: none');

    const viewButton = component.getByText('view');
    fireEvent.click(viewButton);

    expect(detailedDiv).not.toHaveStyle('display: none');
    expect(detailedDiv).toHaveTextContent('test url');
    expect(detailedDiv).toHaveTextContent('9');
  });

  test('clicking like button calls event handler', () => {
    const likeButton = component.getByText('like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockLikeHandler.mock.calls).toHaveLength(2);
  });


});

