import React from 'react';
import {db} from './sqlite';
import moment from 'moment';

const InsertNotify = values => {
  db.transaction(
    tx => {
      tx.executeSql(
        'INSERT INTO Notify(id_mascot, last_date, title) VALUES(?,?,?)',
        [values.mascot, values.last_date, values.type],
      );
    },
    (tx, error) => {
      console.log('Error sqlite insert db Notify');
    },
    (tx, success) => {
      console.log('Insert success fully sqlite db Notify');
    },
  );
};

const DeleteNotify = value => {
  db.transaction(
    tx => {
      tx.executeSql('DELETE FROM Notify WHERE ID = ?', [value]);
    },
    (tx, error) => {
      console.log('Error delete mascot Offline');
    },
    (tx, success) => {
      console.log('Success fully delete mascot Offline');
    },
  );
};

const ConsultNotifyCount = setNotify => {
  db.transaction(
    tx => {
      tx.executeSql('SELECT * FROM Notify ', [], function (tx, results) {
        let len = results.rows.length;
        let number = 0;
        for (let i = 0; i < len; i++) {
          if (
            results.rows.item(i).last_date <=
            moment(new Date()).add(8, 'days').format()
          ) {
            number++;
          }
        }
        setNotify(number);
      });
    },
    (tx, error) => {
      console.log('DB error load not notify');
      console.log(error);
    },
    (_tx, _success) => {
      console.log('Loaded Notify');
    },
  );
};

const ConsultNotify = setNotify => {
  db.transaction(
    tx => {
      tx.executeSql(
        'SELECT * FROM Notify ORDER BY id DESC',
        [],
        function (tx, results) {
          let resp = [];
          let len = results.rows.length;
          for (let i = 0; i < len; i++) {
            if (
              results.rows.item(i).last_date <=
              moment(new Date()).add(8, 'days').format()
            ) {
              resp.push(results.rows.item(i));
            }
          }
          setNotify(resp);
        },
      );
    },
    (tx, error) => {
      console.log('DB error load not notify');
      console.log(error);
    },
    (_tx, _success) => {
      console.log('Loaded Notify');
    },
  );
};

export const database3 = {
  InsertNotify,
  ConsultNotify,
  ConsultNotifyCount,
  DeleteNotify,
};
