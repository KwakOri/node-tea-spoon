"use strict";

class UserStorage {
  static #users = {
    id: ["test1234"],
    psword: ["test1234"],
    name: ["user"],
  };

  static getUsers(...fields) {
    const users = this.#users;
    const newUsers = fields.reduce((newUsers, field) => {
      console.log(field);

      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      console.log(newUsers);
      return newUsers;
    }, {});
    return newUsers;
  }

  static getUserInfo(id) {
    const users = this.#users;
    const idx = users.id.indexOf(id);
    const userInfo = Object.keys(users).reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});

    return userInfo;
  }
}

module.exports = UserStorage;
