import {db} from './sqlite';

const InsertUpdateVerify = (id, element) => {
  db.transaction(
    tx => {
      tx.executeSql('INSERT INTO updateTable(id_update, type) VALUES(?)', [
        id,
        element,
      ]);
    },
    (tx, error) => {
      console.log(error);
    },
    (tx, success) => {
      console.log('Insert id update success fully');
    },
  );
};

const InsertDeteleteVerify = (id, element) => {
  db.transaction(
    tx => {
      tx.executeSql('INSERT INTO deleteTable(id_delete, type) VALUES(?, ?)', [
        id,
        element,
      ]);
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

const ShowDeleteVerify = setResultDelete => {
  try {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM deleteTable`, [], function (tx, results) {
        let resp = [];
        let len = results.rows.length;
        for (let i = 0; i < len; i++) {
          resp.push(results.rows.item(i));
        }
        setResultDelete(resp);
        return;
      });
    });
  } catch (error) {
    console.log('Error' + error);
  }
};

const ShowUpdateVerify = setResultUpdate => {
  try {
    db.transaction(tx => {
      tx.executeSql(`SELECT * FROM updateTable`, [], function (tx, results) {
        let resp = [];
        let len = results.rows.length;
        for (let i = 0; i < len; i++) {
          resp.push(results.rows.item(i));
        }
        setResultUpdate(resp);
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
  ShowUpdateVerify,
  ShowDeleteVerify,
};
