import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const getDBConnection = async () => {
  return SQLite.openDatabase({ name: 'tasks.db', location: 'default' });
};

export const createTable = async (db) => {
  const query = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      date TEXT,
      priority TEXT
    );
  `;
  await db.executeSql(query);
};

export const insertTask = async (db, task) => {
  const insertQuery = `
    INSERT INTO tasks (title, description, date, priority)
    VALUES (?, ?, ?, ?)
  `;
  await db.executeSql(insertQuery, [
    task.title,
    task.description,
    task.date,
    task.priority,
  ]);
};

export const getAllTasks = async (db) => {
  const results = await db.executeSql('SELECT * FROM tasks');
  const tasks = [];

  results.forEach(result => {
    for (let i = 0; i < result.rows.length; i++) {
      tasks.push(result.rows.item(i));
    }
  });

  return tasks;
};

export const deleteTask = async (db, taskId) => {
  const deleteQuery = `DELETE FROM tasks WHERE id = ?`;
  await db.executeSql(deleteQuery, [taskId]);
};

export const updateTask = async (db, task) => {
  const updateQuery = `
    UPDATE tasks
    SET title = ?, description = ?, date = ?, priority = ?
    WHERE id = ?;
  `;
  await db.executeSql(updateQuery, [
    task.title,
    task.description,
    task.date,
    task.priority,
    task.id, // 👈 important: match by ID
  ]);
};
