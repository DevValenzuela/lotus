import React, {useState} from 'react';
import {db} from '../conexion/sqlite';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export const InsertMascot = values => {
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
        values.user,
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

export const InsertMedicament = values => {
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
        values.user,
      ],
      function (transaction, result) {
        console.log('Insert success fully medicament');
      },
      function (transaction, error) {
        console.log(error);
      },
    );
  });
};

export const InsertDesparacitacion = values => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO desparacitacion(last_deworming, medicament, note, mascot, user) VALUES(?,?,?,?,?)',
      [
        values.last_deworming,
        values.medicament,
        values.note,
        values.mascot,
        values.user,
      ],
      function (transaction, result) {
        console.log('Insert success fully desparacitación');
      },
      function (transaction, error) {
        console.log(error);
      },
    );
  });
  return true;
};

export const InsertVaccination = values => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO vaccination(last_vaccination, medicament, note, mascot, user) VALUES(?,?,?,?,?)',
      [
        values.last_vaccination,
        values.medicament,
        values.note,
        values.mascot,
        values.user,
      ],
      function (transaction, result) {
        console.log('Insert success fully desparacitación');
      },
      function (transaction, error) {
        console.log(error);
      },
    );
  });
  return true;
};

export const consultMascotID = (idMascot, dispatchUserEvent) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Mascot WHERE id_mascot = ?`,
        [idMascot],
        function (tx, results) {
          let resp = results.rows.item(0);
          dispatchUserEvent('ADD_SQLITE_MASCOT_ID', {resp: resp});
        },
      );
    });
  } catch (error) {
    console.log('Error' + error);
  }
};

export const consultMascot = dispatchUserEvent => {
  try {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Mascot', [], function (tx, results) {
        let resp = [];
        let len = results.rows.length;
        for (let i = 0; i < len; i++) {
          resp.push(results.rows.item(i));
        }
        dispatchUserEvent('ADD_SQLITE_MASCOT', {resp: resp});
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const consultDesparacitacion = (idMascot, dispatchUserEvent) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM desparacitacion WHERE mascot = ? `,
        [idMascot],
        function (tx, results) {
          let resp = [];
          let len = results.rows.length;
          for (let i = 0; i < len; i++) {
            resp.push(results.rows.item(i));
          }
          dispatchUserEvent('ADD_SQLITE_DEWORMING_ID', {resp: resp});
        },
      );
    });
  } catch (error) {
    console.log('Error' + error);
  }
};
