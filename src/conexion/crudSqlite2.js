import {db} from './sqlite';

const DeleteMascotGeneralOffline = data => {
  db.transaction(
    tx => {
      tx.executeSql('DELETE FROM Mascot WHERE id_mascot = ?', [data]);
    },
    (tx, error) => {
      console.log('Error delete mascot Offline');
    },
    (tx, success) => {
      console.log('Success fully delete mascot Offline');
    },
  );
};

const DeleteDewormingOffline = data => {
  db.transaction(
    tx => {
      tx.executeSql('DELETE FROM desparacitacion WHERE mascot = ? AND ID = ?', [
        data.idMascot,
        data.idTable,
      ]);
    },
    (tx, error) => {
      console.log('Error delete deworming Offline');
    },
    (tx, success) => {
      console.log('Success fully delete deworming Offline');
    },
  );
};

const DeleteVaccinationOffline = data => {
  db.transaction(
    tx => {
      tx.executeSql('DELETE FROM vaccination WHERE mascot = ? AND ID = ?', [
        data.idMascot,
        data.idTable,
      ]);
    },
    (tx, error) => {
      console.log('Error delete vaccination Offline');
    },
    (tx, success) => {
      console.log('Success fully delete vaccination Offline');
    },
  );
};

const DeleteMedicamentOffline = data => {
  db.transaction(
    tx => {
      tx.executeSql('DELETE FROM Medicament WHERE mascot = ? AND ID = ?', [
        data.idMascot,
        data.idTable,
      ]);
    },
    (tx, error) => {
      console.log('Error delete medicament Offline');
    },
    (tx, success) => {
      console.log('Success fully delete medicament Offline');
    },
  );
};

const DeleteControllerMedicOffline = data => {
  db.transaction(
    tx => {
      tx.executeSql(
        'DELETE FROM controller_medic WHERE mascot = ? AND ID = ?',
        [data.idMascot, data.idTable],
      );
    },
    (tx, error) => {
      console.log('Error delete controller medic Offline');
    },
    (tx, success) => {
      console.log('Success fully delete controller medic Offline');
    },
  );
};

export const database2 = {
  DeleteMascotGeneralOffline,
  DeleteDewormingOffline,
  DeleteVaccinationOffline,
  DeleteMedicamentOffline,
  DeleteControllerMedicOffline
};
