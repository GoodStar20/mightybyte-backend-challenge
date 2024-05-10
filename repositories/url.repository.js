const { delayRandomSeconds } = require("../utils");

const urlDb = new Map();

module.exports = Object.freeze({
  findByCode: async (code) => {
    await delayRandomSeconds(); //delay for demo
    return urlDb.get(code);
  },

  insert: async (code, url) => {
    await delayRandomSeconds(); //delay for demo
    urlDb.set(code, url);
  },

  removeByCode: async (code) => {
    await delayRandomSeconds(); //delay for demo
    urlDb.delete(code);
  }
});
