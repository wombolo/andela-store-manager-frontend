export default new class {
  store = {};
  setItem = (key, val) => (this.store[key] = val);
  getItem = key => this.store[key];
  removeItem = key => { delete this.store[key]; };
  clear = () => (this.store = {});
}();

// import 'jest-localstorage-mock';

// export const localStorage = {
//   'authToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm9maWxlIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJBa2FubyIsImxhc3RuYW1lIjoiUGV0ZXIiLCJlbWFpbCI6ImVsa2Vuem9tMUBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpbWFnZSI6InRlYW0tNy5qcGciLCJwYXNzd29yZCI6bnVsbH0sImlhdCI6MTU1MTgwOTA0NCwiZXhwIjoxNTUxODk1NDQ0fQ.qbhb9xZ28nw-_-NP2euYy_TmePPvaj2LAPCyQ5Bva_E'
// };
//
// export default {
//   setItem(key, value) {
//     return Object.assign(localStorage, { [key]: value });
//   },
//   // clear: jest.fn(),
//   getItem(key) {
//     return localStorage[key];
//   }
// };
