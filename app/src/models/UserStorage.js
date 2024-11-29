"use strict";

const fs = require("fs").promises;

class UserStorage {
  static #users = {
    id: ["test1234"],
    psword: ["test1234"],
    name: ["user"],
  };

  static getUsers(...fields) {
    const users = this.#users;
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }

      return newUsers;
    }, {});
    return newUsers;
  }

  static async getUserInfo(id) {
    const DB = await fs.readFile("./src/databases/users.json");
    return this.#getUserInfo(DB, id);
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

  static save(userInfo) {
    const users = this.#users;
    return { success: true };
  }
}

module.exports = UserStorage;
