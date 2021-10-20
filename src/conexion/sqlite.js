import SQLite from 'react-native-sqlite-storage';
export const db = SQLite.openDatabase(
  {
    name: 'MainDB',
    location: 'default',
  },
  () => {
    console.log('Open success fully database sqlite.');
  },
  error => {
    console.log('Error open database sqlite.');
  },
);

