"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require('dotenv').config({ path: __dirname + '/.env' });
const helmet_1 = __importDefault(require("helmet"));
const app = express_1.default();
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes/routes"));
const handleErrors_1 = __importDefault(require("./errors/handleErrors"));
app.use(cors_1.default());
app.use(helmet_1.default());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.set('port', 4300);
//Routes
app.use(routes_1.default);
// Error handles
app.use(handleErrors_1.default);
app.listen(app.get('port'), () => {
    console.log(`Server running on port ${app.get('port')}`);
});
exports.default = app;
