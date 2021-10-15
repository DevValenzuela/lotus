import {useState, useEffect} from 'react';
import {useQuery} from '@apollo/client';

export const useDebounceValue = (input: '', time: 1000, search_type) => {
  const [debouncedValue, setdebounceValue] = useState(input);
  const {data, error, loading} = useQuery(search_type, {
    variables: {
      search: debouncedValue,
    },
  });
  useEffect(() => {
    const timeout = setTimeout(() => {
      setdebounceValue(input);
    }, time);
    return () => {
      clearTimeout(timeout);
    };
  }, [input, time]);
  if (loading) return null;
  if (error) return null;
  return data;
};
