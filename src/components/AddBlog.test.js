import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddBlog from './AddBlog';

// 5.16 Ei valmis vielä

test('<AddBlog /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn();

  const component = render(<AddBlog createBlog={createBlog} />);

  const input = component.container.querySelector('input');
  const form = component.container.querySelector('form');

  fireEvent.change(input, {
    target: { value: 'Testi Blog' },
  });
  fireEvent.submit(form);

  component.debug();

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('Testi Blog');
});
