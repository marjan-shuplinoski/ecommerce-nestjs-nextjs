import { renderHook, act } from '@testing-library/react';
import { useLocalStorage, useDebounce } from '../hooks';

describe('useLocalStorage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('should initialize with default value', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('should update value and localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'default'));
    act(() => {
      result.current[1]('newValue');
    });
    expect(result.current[0]).toBe('newValue');
    expect(window.localStorage.getItem('key')).toBe(JSON.stringify('newValue'));
  });
});

describe('useDebounce', () => {
  jest.useFakeTimers();
  it('should debounce value changes', () => {
    let value = 'a';
    const { result, rerender } = renderHook(({ val }) => useDebounce(val, 500), {
      initialProps: { val: value },
    });
    expect(result.current).toBe('a');
    value = 'b';
    rerender({ val: value });
    act(() => {
      jest.advanceTimersByTime(500);
    });
    expect(result.current).toBe('b');
  });
});
