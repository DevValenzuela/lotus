import {useState, useEffect, useContext} from 'react';
import {useQuery} from '@apollo/client';
import {UserContext} from '../context/userContext';

export const useDebounceValue = (input: '', time: 1000, search_type) => {
  const {
    user: {user},
  } = useContext(UserContext);
  const [debouncedValue, setdebounceValue] = useState(input);
  const {data, error, loading} = useQuery(search_type, {
    pollInterval: time,
    variables: {
      user: user.id,
      search: debouncedValue,
    },
  });

  useEffect(() => {
    setdebounceValue(input);
  }, [input]);

  if (loading) return null;
  if (error) return null;
  return data;
};

