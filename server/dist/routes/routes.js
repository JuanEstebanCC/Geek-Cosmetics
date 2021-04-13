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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Joi = __importStar(require("joi"));
const express_joi_validation_1 = require("express-joi-validation");
const validator = express_joi_validation_1.createValidator();
const router = express_1.Router();
// Import routes
const controllers_1 = require("../controllers/controllers");
// Create validation schemas
const querySchema = Joi.object({
    client_name: Joi.string().required()
});
const querySchemaEdit = Joi.object({
    order_num: Joi.number().required(),
    subtotal: Joi.number().required(),
    iva: Joi.number().required(),
    total: Joi.number().required()
});
const querySchemaEditItems = Joi.object({
    descripcion: Joi.string().required(),
    existencia: Joi.number().required()
});
// Set endpoints
router.get('/items', controllers_1.getItems);
router.get('/orders', controllers_1.getOrders);
router.post('/orders/new', validator.body(querySchema), controllers_1.createOrder);
router.put('/orders/edit', validator.body(querySchemaEdit), controllers_1.editOrders);
router.put('/items/edit', validator.body(querySchemaEditItems), controllers_1.updateItems);
// Export router
exports.default = router;
