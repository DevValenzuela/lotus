import React from 'react';
import {db} from '../conexion/sqlite';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

const InsertMascot = values => {
  let idMascot = uuidv4();

  db.transaction(
    tx => {
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
      );
    },
    (t, error) => {
      console.log(error);
      return false;
    },
    (t, success) => {
      return true;
    },
  );
};

const InsertMedicament = (values, setSuccess) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'INSERT INTO Medicament(last_dose,  medicament, posologia, dosis, period, notation, mascot, user ) VALUES(?,?,?,?,?,?,?,?)',
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
      );
    },
    (tx, error) => {
      console.log(error);
      setSuccess(false);
    },
    (tx, success) => {
      setSuccess(true);
    },
  );
};

const InsertDesparacitacion = (values, setSuccess) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'INSERT INTO desparacitacion(last_deworming, medicament, note, mascot, user) VALUES(?,?,?,?,?)',
        [
          values.last_deworming,
          values.medicament,
          values.note,
          values.mascot,
          values.user,
        ],
      );
    },
    (t, error) => {
      console.log(error);
      setSuccess(false);
    },
    (t, success) => {
      setSuccess(true);
    },
  );
};

const InsertVaccination = (values, setSuccess) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'INSERT INTO vaccination(last_vaccination, medicament, note, mascot, user) VALUES(?,?,?,?,?)',
        [
          values.last_vaccination,
          values.medicament,
          values.note,
          values.mascot,
          values.user,
        ],
      );
    },
    (t, error) => {
      console.log(error);
      setSuccess(false);
    },
    (t, success) => {
      setSuccess(true);
    },
  );
};

const consultMascotID = (idMascot, setMacotFunc) => {
  db.transaction(
    tx => {
      tx.executeSql(
        `SELECT * FROM Mascot WHERE id_mascot = ?`,
        [idMascot],
        function (tx, results) {
          let resp = results.rows.item(0);
          setMacotFunc(resp);
        },
      );
    },
    (t, error) => {
      console.log('DB error load mascot ID');
      console.log(error);
    },
    (_t, _success) => {
      console.log('Loaded mascot ID');
    },
  );
};

const consultMascot = dispatchUserEvent => {
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

const consultDesparacitacion = (idMascot, setDewormingFunc) => {
  db.transaction(
    tx => {
      tx.executeSql(
        `SELECT * FROM desparacitacion WHERE mascot = ? `,
        [idMascot],
        function (tx, results) {
          let resp = [];
          let len = results.rows.length;
          for (let i = 0; i < len; i++) {
            resp.push(results.rows.item(i));
          }
          setDewormingFunc(resp);
        },
      );
    },
    (t, error) => {
      console.log('DB error load deworming');
      console.log(error);
    },
    (_t, _success) => {
      console.log('Loaded deworming');
    },
  );
};

const consultVaccination = (idMascot, setDewormingFunc) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM vaccination WHERE mascot = ? `,
        [idMascot],
        function (tx, results) {
          let resp = [];
          let len = results.rows.length;
          for (let i = 0; i < len; i++) {
            resp.push(results.rows.item(i));
          }
          if (resp) {
            setDewormingFunc(resp);
          }
          return;
        },
      );
    });
  } catch (error) {
    console.log('Error' + error);
  }
};

export const database = {
  consultMascot,
  consultDesparacitacion,
  consultMascotID,
  consultVaccination,
  InsertMascot,
  InsertDesparacitacion,
  InsertMedicament,
  InsertVaccination,
};
