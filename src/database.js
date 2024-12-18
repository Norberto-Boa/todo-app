import fs from 'node:fs/promises';

const databasePath = new URL('../db.json', import.meta.url);

export class Database {
  #database = {};

  constructor() {
    fs.readFile(databasePath, 'utf-8').then((data) => {
      this.#database = JSON.parse(data);
    }).catch(() => {
      this.#persist();
    })
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  select(table, search) {
    let data = this.#database[table] ?? [];

    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase());
        })
      })

      return data;
    }
    return data;
  }

  getById(table, id) {
    let data = this.#database[table] ?? [];

    data = data.filter(row => {
      console.log(row.id === id);
      return row.id === id;
    });

    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return data;
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id);

    if (rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1);
      this.#persist();
    }
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id);


    if (rowIndex > -1) {
      // Get the existing row
      const existingRow = this.#database[table][rowIndex];

      // Merge existing data with the new data and update `updatedAt`
      this.#database[table][rowIndex] = {
        ...existingRow,    // Spread the existing fields
        ...data,           // Overwrite with new data
        updatedAt: new Date().toISOString(), // Always update `updatedAt`
      };

      this.#persist();
    }
  }
}