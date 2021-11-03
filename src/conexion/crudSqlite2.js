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
      tx.executeSql('DELETE FROM desparacitacion WHERE id_deworming = ?', [
        data,
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
  console.log(data);
  db.transaction(
    tx => {
      tx.executeSql('DELETE FROM vaccination WHERE id_vaccination = ?', [data]);
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
      tx.executeSql('DELETE FROM Medicament WHERE id_medicament = ?', [data]);
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
      tx.executeSql('DELETE FROM controller_medic WHERE id_medic = ?', [data]);
    },
    (tx, error) => {
      console.log('Error delete controller medic Offline');
    },
    (tx, success) => {
      console.log('Success fully delete controller medic Offline');
    },
  );
};

const ConsultMedicamentGeneral = setMedicamentFunc => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Medicament ORDER BY ID DESC`,
        [],
        function (tx, results) {
          let resp = [];
          let len = results.rows.length;
          for (let i = 0; i < len; i++) {
            resp.push({
              id: results.rows.item(i).ID,
              date: results.rows.item(i).last_dose,
            });
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

const ConsultDewormingGeneral = setDewormingFunc => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM desparacitacion ORDER BY ID DESC`,
        [],
        function (tx, results) {
          let resp = [];
          let len = results.rows.length;
          for (let i = 0; i < len; i++) {
            resp.push({
              id: results.rows.item(i).ID,
              date: results.rows.item(i).last_deworming,
            });
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

const ConsultVaccinationGeneral = setVaccinationFunc => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM vaccination ORDER BY ID DESC`,
        [],
        function (tx, results) {
          let resp = [];
          let len = results.rows.length;
          for (let i = 0; i < len; i++) {
            resp.push({
              id: results.rows.item(i).ID,
              date: results.rows.item(i).last_vaccination,
            });
          }
          if (resp) {
            setVaccinationFunc(resp);
          }
          return;
        },
      );
    });
  } catch (error) {
    console.log('Error' + error);
  }
};

const ConsultControllerVetGeneral = setControllerVetFunc => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM controller_medic ORDER BY ID DESC`,
        [],
        function (tx, results) {
          let resp = [];
          let len = results.rows.length;
          for (let i = 0; i < len; i++) {
            console.log(results.rows.item(i));
            resp.push({
              id: results.rows.item(i).ID,
              date: results.rows.item(i).last_control,
            });
          }
          if (resp) {
            setControllerVetFunc(resp);
          }
          return;
        },
      );
    });
  } catch (error) {
    console.log('Error' + error);
  }
};

const ConsultDewormingHistory = (idMascot, setDewormingHistoryFunc) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM desparacitacion WHERE mascot =  ? ORDER BY ID DESC`,
        [idMascot],
        function (tx, results) {
          let resp = [];
          let len = results.rows.length;
          for (let i = 0; i < len; i++) {
            resp.push({
              id: results.rows.item(i).ID,
              id_deworming: results.rows.item(i).id_deworming,
              last_deworming: results.rows.item(i).last_deworming,
            });
          }
          if (resp) {
            setDewormingHistoryFunc(resp);
          }
          return;
        },
      );
    });
  } catch (error) {
    console.log('Error' + error);
  }
};

const ConsultVaccinationHistory = (idMascot, setDewormingHistoryFunc) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM vaccination WHERE mascot =  ? ORDER BY ID DESC`,
        [idMascot],
        function (tx, results) {
          let resp = [];
          let len = results.rows.length;
          for (let i = 0; i < len; i++) {
            resp.push({
              id: results.rows.item(i).ID,
              id_vaccination: results.rows.item(i).id_vaccination,
              last_vaccination: results.rows.item(i).last_vaccination,
            });
          }
          if (resp) {
            setDewormingHistoryFunc(resp);
          }
          return;
        },
      );
    });
  } catch (error) {
    console.log('Error' + error);
  }
};

const ConsultMedicamentHistory = (idMascot, setMedicamentHistoryFunc) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Medicament WHERE mascot =  ? ORDER BY ID DESC`,
        [idMascot],
        function (tx, results) {
          let resp = [];
          let len = results.rows.length;
          for (let i = 0; i < len; i++) {
            resp.push({
              id: results.rows.item(i).ID,
              id_medicament: results.rows.item(i).id_medicament,
              last_dose: results.rows.item(i).last_dose,
            });
          }
          if (resp) {
            setMedicamentHistoryFunc(resp);
          }
          return;
        },
      );
    });
  } catch (error) {
    console.log('Error' + error);
  }
};

const ConsultControllerMedic = (idMascot, setControllerMedicFunc) => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM controller_medic WHERE mascot =  ? ORDER BY ID DESC`,
        [idMascot],
        function (tx, results) {
          let resp = [];
          let len = results.rows.length;
          for (let i = 0; i < len; i++) {
            resp.push({
              id: results.rows.item(i).ID,
              id_medic: results.rows.item(i).id_medic,
              last_control: results.rows.item(i).last_control,
            });
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

export const database2 = {
  DeleteMascotGeneralOffline,
  DeleteDewormingOffline,
  DeleteVaccinationOffline,
  DeleteMedicamentOffline,
  DeleteControllerMedicOffline,
  ConsultMedicamentGeneral,
  ConsultDewormingGeneral,
  ConsultVaccinationGeneral,
  ConsultControllerVetGeneral,
  ConsultDewormingHistory,
  ConsultVaccinationHistory,
  ConsultMedicamentHistory,
  ConsultControllerMedic,
};
