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
const express_1 = require("express");
const db_1 = require("../database/db");
const router = express_1.Router();
// Get's
router.get('/items', (req, res, next) => {
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
router.get('/orders', (req, res, next) => {
    try {
        db_1.connection.query('SELECT * FROM  orders', (err, rows) => {
            res.status(200).json(rows);
        });
    }
    catch (e) {
        console.log(e);
        next(e);
    }
});
//Post's
router.post('/orders/new', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { client_name } = req.body;
        const validate = yield validation_newOrder.validateAsync(req.body);
        db_1.connection.query('INSERT INTO orders (client_name) VALUES(?)', [client_name], function (err, results) {
            res.status(200).json(results);
        });
    }
    catch (e) {
        console.log(e);
        next(e);
    }
}));
//Put's
router.put('/orders/edit', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order_num, subtotal, iva, total } = req.body;
        const validate = yield validation_editOrder.validateAsync(req.body);
        db_1.connection.query('UPDATE orders SET subtotal = ?, iva = ?, total = ? WHERE order_num = ?', [subtotal, iva, total, order_num], function (err, results) {
            res.status(200).json(results);
        });
    }
    catch (e) {
        console.log(e);
        next(e);
    }
}));
exports.default = router;
