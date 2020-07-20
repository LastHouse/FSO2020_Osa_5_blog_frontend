import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

const user = {
  username: 'tester',
  name: 'test',
};

//5.13

test('renders content', () => {
  const blog = {
    title: 'Test blog',
    author: 'Tim Test',
    user: 'test',
  };

  const component = render(<Blog blog={blog} user={user} />);

  component.debug();

  expect(component.container).toHaveTextContent('Test blog');
});

//5.15

test('clicking the button calls event handler twice', async () => {
  const blog = {
    title: 'Test blog',
    author: 'Tim Test',
    user: 'test',
  };

  const mockHandler = jest.fn();

  const component = render(
    <Blog blog={blog} likeBlog={mockHandler} user={user} />
  );

  component.debug();

  const button = component.getByText('like');
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
