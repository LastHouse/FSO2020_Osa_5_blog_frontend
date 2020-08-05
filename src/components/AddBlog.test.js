import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddBlog from './AddBlog';

// 5.16

test('<AddBlog /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn();

  const component = render(<AddBlog createBlog={createBlog} />);

  const title = component.container.querySelector(
    "div.newBlogForm input[name='title']"
  );
  const author = component.container.querySelector(
    "div.newBlogForm input[name='author']"
  );
  const url = component.container.querySelector(
    "div.newBlogForm input[name='url']"
  );
  const form = component.container.querySelector('form');

  fireEvent.change(title, {
    target: { value: 'Testi Blog' },
  });
  fireEvent.change(author, {
    target: { value: 'Mr. Mockup' },
  });
  fireEvent.change(url, {
    target: { value: 'www.testing.com' },
  });
  fireEvent.submit(form);

  component.debug();

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('Testi Blog');
  expect(createBlog.mock.calls[0][0].author).toBe('Mr. Mockup');
  expect(createBlog.mock.calls[0][0].url).toBe('www.testing.com');
});
