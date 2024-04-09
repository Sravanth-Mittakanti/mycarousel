// MyCarousel.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import MyCarousel from './Carousel';
import { RootState } from '../store';
import configureMockStore from 'redux-mock-store';
// Mock initial state and Redux store
const initialState: RootState = {
  media: [
    { id: 1, type: 'image', url: 'image-url', title: '' },
    { id: 2, type: 'video', url: 'video-url', title: '' },
  ],
};
const mockStore: any = configureMockStore();

describe('MyCarousel Component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore(initialState);
  });

  test('renders media items correctly', () => {
    const { getByAltText } = render(
      <Provider store={store}>
        <MyCarousel mediaPerPage={1} />
      </Provider>
    );

    // Assert that media items are rendered
    expect(getByAltText('image')).toBeInTheDocument();
    expect(getByAltText('video')).toBeInTheDocument();
  });

  test('handles page navigation correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <MyCarousel mediaPerPage={1} />
      </Provider>
    );

    // Click next page button
    fireEvent.click(getByText('>'));
    // Assert that the page has changed
    expect(getByText('video')).toBeInTheDocument();

    // Click previous page button
    fireEvent.click(getByText('<'));
    // Assert that the page has changed back
    expect(getByText('image')).toBeInTheDocument();
  });

  test('handles input change correctly', () => {
    const { getByDisplayValue } = render(
      <Provider store={store}>
        <MyCarousel mediaPerPage={1} />
      </Provider>
    );

    const input = getByDisplayValue('');
    fireEvent.change(input, { target: { value: 'New Title' } });

    // Assert that input value has changed
    expect(input.value).toBe('New Title');
  });
});
