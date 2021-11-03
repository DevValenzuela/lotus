import React, {useEffect, useState} from 'react';
import {verifyDB} from '../conexion/crudVerify';
const InitDB = () => {
  const [getResultCreate, setResultCreate] = useState([]);

  const consultTables = async () => {
    await verifyDB.ShowCreateVerify(setResultCreate);
  };

  useEffect(() => {
    consultTables();
  }, []);

  return [
    {
      getResultCreate,
    },
  ];
};

export default InitDB;
