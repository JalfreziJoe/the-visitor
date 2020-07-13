import { useState, useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const activeHttpRequests = useRef([]);

  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortControl = new AbortController();
      activeHttpRequests.current.push(httpAbortControl);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortControl.signal,
        });

        const resData = await response.json();

        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortControl
        );

        if (!response.ok) throw new Error(resData.message);
        setIsLoading(false);
        return resData;
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  /** clean up */
  useEffect(() => {
    return () => {
      // es-lint-disable-next-line
      activeHttpRequests.current.forEach(abortControl => abortControl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
