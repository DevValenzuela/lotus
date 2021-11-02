import {db} from './sqlite';

const InsertUpdateVerify = id => {
  db.transaction(
    tx => {
      tx.executeSql('INSERT INTO updateTable(id_update) VALUES(?)', [id]);
    },
    (tx, error) => {
      console.log(error);
    },
    (tx, success) => {
      console.log('Insert id update success fully');
    },
  );
};

const InsertDeteleteVerify = id => {
  db.transaction(
    tx => {
      tx.executeSql('INSERT INTO deleteTable(id_delete) VALUES(?)', [id]);
    },
    (tx, error) => {
      console.log(error);
    },
    (tx, success) => {
      console.log('Insert id verify success fully');
    },
  );
};

const InsertCreateVerify = (id, element) => {
  db.transaction(
    tx => {
      tx.executeSql('INSERT INTO createTable(id_create, type) VALUES(?, ?)', [
        id,
        element,
      ]);
    },
    (tx, error) => {
      console.log(error);
    },
    (tx, success) => {
      console.log('Insert id create success fully');
    },
  );
};

const ShowCreateVerify = setResultCreate => {
  try {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM createTable`, [], function (tx, results) {
        let resp = [];
        let len = results.rows.length;
        for (let i = 0; i < len; i++) {
          console.log(results.rows.item(i));
          /*resp.push({
            id: results.rows.item(i).ID,
            id_medicament: results.rows.item(i).id_medicament,
            last_dose: results.rows.item(i).last_dose,
          });*/
        }
        if (resp) {
          setResultCreate(resp);
        }
        return;
      });
    });
  } catch (error) {
    console.log('Error' + error);
  }
};

export const verifyDB = {
  InsertUpdateVerify,
  InsertDeteleteVerify,
  InsertCreateVerify,
  ShowCreateVerify,
};
