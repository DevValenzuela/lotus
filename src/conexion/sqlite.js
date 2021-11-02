import SQLite from 'react-native-sqlite-storage';
export const db = SQLite.openDatabase(
  {name: 'table.db', location: 'default'},
  () => {
    console.log('Open success fully database sqlite.');
  },
  error => {
    console.log('Error open database sqlite.');
  },
);

export const createTableDB = tx => {
  //Create Table Notify
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS ' +
      'Notify ' +
      '(ID INTEGER PRIMARY KEY AUTOINCREMENT, id_mascot TEXT, last_date TEXT, title TEXT);',
  );
  //Create Table Mascot
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS ' +
      'Mascot ' +
      '(ID INTEGER PRIMARY KEY AUTOINCREMENT, id_mascot TEXT, name_mascot VARCHAR(200), age_mascot Int, type_mascot VARCHAR(200), race_mascot VARCHAR(200), date_sterilized VARCHAR(200), number_microchip TEXT, microchip VARCHAR(120) , description TEXT,  user VARCHAR(120)  );',
  );
  //Create Table Medicament
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS ' +
      'Medicament ' +
      '(ID INTEGER PRIMARY KEY AUTOINCREMENT, id_medicament TEXT, last_dose VARCHAR(200), medicament VARCHAR(200), posologia VARCHAR(200), dosis VARCHAR(200), period VARCHAR(200), notation TEXT, mascot TEXT,  user VARCHAR(120) );',
  );
  //Create Table Controller Medic
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS ' +
      'controller_medic ' +
      '(ID INTEGER PRIMARY KEY AUTOINCREMENT, id_medic TEXT, last_control VARCHAR(200), assestment VARCHAR(200), note TEXT, mascot TEXT,  user VARCHAR(120) );',
  );
  //Create Table Desparacitacion
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS ' +
      'desparacitacion ' +
      '(ID INTEGER PRIMARY KEY AUTOINCREMENT, id_deworming TEXT, last_deworming VARCHAR(200), medicament VARCHAR(200), note TEXT, mascot TEXT,  user VARCHAR(120) );',
  );
  //Create Table Vacunacion
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS ' +
      'vaccination ' +
      '(ID INTEGER PRIMARY KEY AUTOINCREMENT, id_vaccination TEXT, last_vaccination VARCHAR(200), medicament VARCHAR(200), note TEXT, mascot TEXT,  user VARCHAR(120) );',
  );
  //Create Table Update
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS ' +
      'updateTable ' +
      '(ID INTEGER PRIMARY KEY AUTOINCREMENT, id_update TEXT, type TEXT );',
  );
  //Create Table Delete
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS ' +
      'deleteTable ' +
      '(ID INTEGER PRIMARY KEY AUTOINCREMENT, id_delete TEXT, type TEXT );',
  );
  //Create Table New
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS ' +
      'createTable ' +
      '(ID INTEGER PRIMARY KEY AUTOINCREMENT, id_create TEXT, type TEXT );',
  );
};
