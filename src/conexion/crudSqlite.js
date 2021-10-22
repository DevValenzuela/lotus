import React from 'react';
import {db} from '../conexion/sqlite';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export const InsertMascot = (values, user) => {
  let idMascot = uuidv4();
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO Mascot(id_mascot ,name_mascot, age_mascot, type_mascot, race_mascot, date_sterilized, number_microchip, microchip, description, user) VALUES(?,?,?,?,?,?,?,?,?,?)',
      [
        idMascot,
        values.name_mascot,
        values.age_mascot,
        values.type_mascot,
        values.race_mascot,
        values.date_sterilized,
        values.number_microchip,
        values.microchip,
        values.description,
        user.id,
      ],
      function (transaction, result) {
        console.log('Insert new mascot');
      },
      function (transaction, error) {
        console.log('Error insert new mascot');
      },
    );
  });
  return true;
};

export const InsertMedicament = (db, values, user) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO Medicament(last_dose, medicament, posologia, dosis, period, notation, mascot, user ) VALUES(?,?,?,?,?,?,?,?)',
      [
        values.last_dose,
        values.medicament,
        values.posologia,
        values.dosis,
        values.period,
        values.notation,
        values.mascot,
        user.id,
      ],
      function (transaction, result) {
        navigation.navigate('Gratulations', {
          txtMsg: 'Que bien has ingresado un nuevo medicament',
        });
      },
      function (transaction, error) {
        console.log(error);
      },
    );
  });
};

export const consultMascot = ( dispatchUserEvent) => {
  try {
    let state = [];
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Mascot', [],  function (tx, results) {
          let len = results.rows.length;
          let resp = [];
          for (let i = 0; i < len; i++) {
              resp.push(results.rows.item(i));
          }
          dispatchUserEvent('ADD_SQLITE_MASCOT', {resp: resp})
      });
    });
  } catch (error) {
    console.log(error);
  }
};
