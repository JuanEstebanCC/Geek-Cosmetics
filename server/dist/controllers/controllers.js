"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItems = exports.editOrders = exports.createOrder = exports.getOrders = exports.getItems = void 0;
const db_1 = require("../database/db");
const express_joi_validation_1 = require("express-joi-validation");
const getItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_1.connection.query('SELECT * FROM  items', (err, rows) => {
            res.status(200).json(rows);
        });
    }
    catch (e) {
        console.log(e);
        next(e);
    }
});
exports.getItems = getItems;
// Get's
const getOrders = (req, res, next) => {
    try {
        db_1.connection.query('SELECT * FROM  orders', (err, rows) => {
            res.status(200).json(rows);
        });
    }
    catch (e) {
        console.log(e);
        next(e);
    }
};
exports.getOrders = getOrders;
//Post's
const createOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { client_name } = req.body;
        db_1.connection.query('INSERT INTO orders (client_name) VALUES(?)', [client_name], function (err, results) {
            res.status(200).json(results);
        });
    }
    catch (e) {
        console.log(e);
        next(e);
    }
});
exports.createOrder = createOrder;
//Put's
const editOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_num, subtotal, iva, total } = req.body;
        db_1.connection.query('UPDATE orders SET subtotal = ?, iva = ?, total = ? WHERE order_num = ?', [subtotal, iva, total, order_num], function (err, results) {
            res.status(200).json(results);
        });
    }
    catch (e) {
        console.log(e);
        next(e);
    }
});
exports.editOrders = editOrders;
const updateItems = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { descripcion, existencia } = req.body;
        db_1.connection.query('UPDATE items SET existencia = ? WHERE descripcion = ?', [existencia, descripcion], function (err, results) {
            res.status(200).json(results);
        });
    }
    catch (e) {
        console.log(e);
        next(e);
    }
});
exports.updateItems = updateItems;
