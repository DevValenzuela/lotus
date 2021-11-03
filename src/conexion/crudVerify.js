import {db} from './sqlite';

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
          resp.push(results.rows.item(i));
        }
        setResultCreate(resp);
        return;
      });
    });
  } catch (error) {
    console.log('Error' + error);
  }
};

const DeleteTableCreate = () => {
  try {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM createTable',
        [],
        function (tx, results) {
          console.log('Successfully Dropped Table InsertCreate');
        },
        function (tx, error) {
          console.log('Could Not Delete Table InsertCreate');
        },
      );
    });
  } catch (error) {
    console.log('Error' + error);
  }
};

export const verifyDB = {
  InsertCreateVerify,
  ShowCreateVerify,
  DeleteTableCreate,
};
