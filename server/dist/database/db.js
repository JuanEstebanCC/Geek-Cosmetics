"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mysql2_1 = require("mysql2");
exports.connection = mysql2_1.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'geek_cosmetics',
    password: 'LCELMIELV'
});
