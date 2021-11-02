import React from 'react';
import {db} from '../conexion/sqlite';
import 'react-native-get-random-values';
const InsertMascot = (values, setSuccess) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'INSERT INTO Mascot(id_mascot ,name_mascot, age_mascot, type_mascot, race_mascot, date_sterilized, number_microchip, microchip, description, user) VALUES(?,?,?,?,?,?,?,?,?,?)',
        [
          values.id_mascot,
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
    (tx, error) => {
      console.log('Error insert table mascot sqlite.');
      console.log(error)
      setSuccess(false);
    },
    (tx, success) => {
      setSuccess(true);
    },
  );
};

const InsertMedicament = (values, setSuccess) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'INSERT INTO Medicament(id_medicament, last_dose,  medicament, posologia, dosis, period, notation, mascot, user ) VALUES(?,?,?,?,?,?,?,?,?)',
        [
          values.id_medicament,
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
        'INSERT INTO desparacitacion(id_deworming, last_deworming, medicament, note, mascot, user) VALUES(?,?,?,?,?,?)',
        [
          values.id_deworming,
          values.last_deworming,
          values.medicament,
          values.note,
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
    (tx, error) => {
      console.log(error);
      setSuccess(false);
    },
    (tx, success) => {
      setSuccess(true);
    },
  );
};

const InsertControllerMedic = (values, setSuccess) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'INSERT INTO controller_medic(id_medic, last_control, assestment, note, mascot, user) VALUES(?,?,?,?,?,?)',
        [
          values.id_medic,
          values.last_control,
          values.assesment,
          values.note,
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
    (tx, error) => {
      console.log('DB error load mascot ID');
      console.log(error);
    },
    (_tx, _success) => {
      console.log('Loaded mascot ID');
    },
  );
};

const consultMascot = dispatchUserEvent => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Mascot ORDER BY ID DESC',
        [],
        function (tx, results) {
          let resp = [];
          let len = results.rows.length;
          for (let i = 0; i < len; i++) {
            resp.push(results.rows.item(i));
          }
          dispatchUserEvent('ADD_SQLITE_MASCOT', {resp: resp});
        },
      );
    });
  } catch (error) {
    console.log(error);
  }
};

const consultDesparacitacion = (idMascot, setDewormingFunc) => {
  db.transaction(
    tx => {
      tx.executeSql(
        `SELECT * FROM desparacitacion WHERE mascot = ? ORDER BY ID DESC`,
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

const consultMedicamentDetails = (idDetails, setDewormingFunc) => {
  db.transaction(
    tx => {
      tx.executeSql(
        `SELECT * FROM Medicament WHERE id_medicament = ?`,
        [idDetails],
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

const consultDesparacitacionDetails = (idDetails, setDewormingFunc) => {
  db.transaction(
    tx => {
      tx.executeSql(
        `SELECT * FROM desparacitacion WHERE id_deworming = ?`,
        [idDetails],
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
        `SELECT * FROM vaccination WHERE mascot = ? ORDER BY ID DESC`,
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

const consultVaccinationDetails = (idDetails, setDewormingFunc) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM vaccination WHERE id_vaccination = ?`,
        [idDetails],
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

const consultMedicamnets = (idMascot, setMedicamentFunc) => {
  console.log(idMascot);
  try {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Medicament WHERE mascot = ? ORDER BY ID DESC`,
        [idMascot],
        function (tx, results) {
          let resp = [];
          let len = results.rows.length;
          for (let i = 0; i < len; i++) {
            resp.push(results.rows.item(i));
          }
          if (resp) {
            setMedicamentFunc(resp);
          }
          return;
        },
      );
    });
  } catch (error) {
    console.log('Error' + error);
  }
};

const consultControllerMedic = (idMascot, setControllerMedicFunc) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM controller_medic WHERE mascot = ? ORDER BY ID DESC`,
        [idMascot],
        function (tx, results) {
          let resp = [];
          let len = results.rows.length;
          for (let i = 0; i < len; i++) {
            resp.push(results.rows.item(i));
          }
          if (resp) {
            setControllerMedicFunc(resp);
          }
          return;
        },
      );
    });
  } catch (error) {
    console.log('Error' + error);
  }
};

const consultControllerMedicDetails = (idDetails, setControllerMedicFunc) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM controller_medic WHERE id_medic = ? `,
        [idDetails],
        function (tx, results) {
          let resp = [];
          let len = results.rows.length;
          for (let i = 0; i < len; i++) {
            resp.push(results.rows.item(i));
          }
          if (resp) {
            setControllerMedicFunc(resp);
          }
          return;
        },
      );
    });
  } catch (error) {
    console.log('Error' + error);
  }
};

const UpdateMascot = (idMascot, values, setSuccess) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'UPDATE Mascot SET  type_mascot = ? , race_mascot = ?, date_sterilized = ?, number_microchip = ?, microchip = ?, description = ? WHERE id_mascot = ? ',
        [
          values.type_mascot,
          values.race_mascot,
          values.date_sterilized,
          values.number_microchip,
          values.microchip,
          values.description,
          idMascot,
        ],
      );
    },
    (tx, error) => {
      setSuccess(false);
    },
    (tx, success) => {
      setSuccess(true);
    },
  );
};

const UpdateDeworming = (idTable, idMascot, values, setSuccess) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'UPDATE desparacitacion SET  last_deworming = ? , medicament = ?, note = ? WHERE mascot = ? AND id_deworming = ?',
        [
          values.last_deworming,
          values.medicament,
          values.note,
          idMascot,
          idTable,
        ],
      );
    },
    (tx, error) => {
      setSuccess(false);
    },
    (tx, success) => {
      setSuccess(true);
    },
  );
};

const UpdateVaccination = (idTable, idMascot, values, setSuccess) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'UPDATE vaccination SET  last_vaccination = ? , medicament = ?, note = ? WHERE mascot = ? AND id_vaccination = ? ',
        [
          values.last_vaccination,
          values.medicament,
          values.note,
          idMascot,
          idTable,
        ],
      );
    },
    (tx, error) => {
      setSuccess(false);
    },
    (tx, success) => {
      setSuccess(true);
    },
  );
};

const UpdateMedicament = (idTable, idMascot, values, setSuccess) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'UPDATE Medicament SET  last_dose = ? , medicament = ?, posologia = ?, dosis = ?, period = ?, notation = ? WHERE mascot = ?  AND  id_medicament = ?',
        [
          values.last_dose,
          values.medicament,
          values.posologia,
          values.dosis,
          values.period,
          values.notation,
          idMascot,
          idTable,
        ],
      );
    },
    (tx, error) => {
      setSuccess(false);
    },
    (tx, success) => {
      setSuccess(true);
    },
  );
};

const UpdateControllerMedic = (idTable, idMascot, values, setSuccess) => {
  db.transaction(
    tx => {
      tx.executeSql(
        'UPDATE controller_medic SET last_control = ? , assestment = ?, note = ? WHERE mascot = ? AND id_medic = ?',
        [
          values.last_control,
          values.valoration,
          values.note,
          idMascot,
          idTable,
        ],
      );
    },
    (tx, error) => {
      setSuccess(false);
    },
    (tx, success) => {
      setSuccess(true);
    },
  );
};

export const database = {
  consultMascot,
  consultDesparacitacion,
  consultMascotID,
  consultVaccination,
  consultMedicamnets,
  consultControllerMedic,
  consultDesparacitacionDetails,
  consultVaccinationDetails,
  consultMedicamentDetails,
  consultControllerMedicDetails,
  InsertMascot,
  InsertDesparacitacion,
  InsertMedicament,
  InsertVaccination,
  InsertControllerMedic,
  UpdateMascot,
  UpdateDeworming,
  UpdateVaccination,
  UpdateMedicament,
  UpdateControllerMedic,
};
