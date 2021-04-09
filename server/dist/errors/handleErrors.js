"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandle = (e, req, res, next) => {
    res.status(500).send({ error: e });
};
exports.default = errorHandle;
