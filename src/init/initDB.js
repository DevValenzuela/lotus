import React, {useEffect, useState} from 'react';
import {verifyDB} from '../conexion/crudVerify';
const InitDB = () => {
  const [getResultCreate, setResultCreate] = useState([]);
  const [getResultUpdate, setResultUpdate] = useState([]);
  const [getResultDelete, setResultDelete] = useState([]);

  const consultTables = async () => {
    await verifyDB.ShowCreateVerify(setResultCreate);
    await verifyDB.ShowUpdateVerify(setResultUpdate);
    await verifyDB.ShowDeleteVerify(setResultDelete);
  };

  useEffect(() => {
    consultTables();
  }, []);

  return [
    {
      getResultCreate,
      getResultUpdate,
      getResultDelete,
    },
  ];
};

export default InitDB;
