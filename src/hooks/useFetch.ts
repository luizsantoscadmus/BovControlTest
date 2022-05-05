import {useState} from 'react';

type UseFetch<T> = {makeRequest: () => void; data: T[]; isLoading: boolean};

function useFetch<T>(url: string, options?: RequestInit): UseFetch<T> {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<T[]>([]);

  const makeRequest = async (body?: any) => {
    try {
      const response = await fetch(url, {...options, body});
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {makeRequest, data, isLoading};
}

export default useFetch;
