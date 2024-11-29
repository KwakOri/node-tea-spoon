"use strict";

const db = require("../config/db");

class UserStorage {
  static #getUsers(DB, fields) {
    const users = JSON.parse(DB);
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }

  static async getUsers(...fields) {
    const DB = await fs.readFile(DBUrl);
    return this.#getUsers(DB, fields);
  }

  static async getAllUsers() {
    return await this.getUsers("id", "psword", "name");
  }

  static async getUserInfo(id) {
    return new Promise(async (resolve, reject) => {
      const query = "SELECT * FROM users where id = $1";
      try {
        const { rows } = await db.query(query, [id]);
        resolve(rows[0]);
      } catch (err) {
        reject(err);
      }
    });
  }

  static async save(userInfo) {
    return new Promise(async (resolve, reject) => {
      const query = "INSERT INTO users(id, name, psword) VALUES($1, $2, $3)";
      try {
        const res = await db.query(query, [
          userInfo.id,
          userInfo.name,
          userInfo.psword,
        ]);
        resolve({ success: true });
      } catch (err) {
        reject(err);
      }
    });
  }
}

module.exports = UserStorage;
