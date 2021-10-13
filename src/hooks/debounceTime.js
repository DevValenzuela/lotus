import {useState, useEffect} from 'react';
import {useQuery} from '@apollo/client';
import {CONSULT_SEARCH_FILTER_VACCINATIONS} from '../pages/apolllo/query';

export const useDebounceValue = (input: '', time: 1000) => {
  const [debouncedValue, setdebounceValue] = useState(input);
  const {data, error, loading} = useQuery(CONSULT_SEARCH_FILTER_VACCINATIONS, {
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
