import { useState, useEffect } from 'react';

interface FetchResponse<T> {
  data?: T;
  error?: Error;
  isLoading: boolean;
}

const useFetchAPI = <T>(url: string): FetchResponse<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }

        const responseData = await response.json();
        setData(responseData);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, error, isLoading };
};

export default useFetchAPI;