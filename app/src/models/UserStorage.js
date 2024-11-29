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

  static #getUserInfo(DB, id) {
    const users = JSON.parse(DB);
    const idx = users.id.indexOf(id);
    const userInfo = Object.keys(users).reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});

    return userInfo;
  }

  static async getUserInfo(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM users where id = ?";
      db.query(query, [id], (err, data) => {
        if (err) reject(err);
        resolve(data[0]);
      });
    });
  }

  static async save(userInfo) {
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO users(id, name, psword) VALUES(?, ?, ?)";
      db.query(query, [userInfo.id, userInfo.name, userInfo.psword], (err) => {
        if (err) reject(err);
        resolve({ success: true });
      });
    });
  }
}

module.exports = UserStorage;
