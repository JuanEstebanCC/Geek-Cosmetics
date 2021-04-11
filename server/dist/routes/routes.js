"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const Joi = __importStar(require("joi"));
const db_1 = require("../database/db");
const express_joi_validation_1 = require("express-joi-validation");
const validator = express_joi_validation_1.createValidator();
const router = express_1.Router();
const querySchema = Joi.object({
    client_name: Joi.string().required()
});
const querySchemaEdit = Joi.object({
    order_num: Joi.number().required(),
    subtotal: Joi.number().required(),
    iva: Joi.number().required(),
    total: Joi.number().required()
});
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
router.post('/orders/new', validator.body(querySchema), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
//Put's
router.put('/orders/edit', validator.body(querySchemaEdit), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
router.put('/items/edit', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
}));
exports.default = router;
