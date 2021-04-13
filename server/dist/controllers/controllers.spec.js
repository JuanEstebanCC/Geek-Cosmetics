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
require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const controllers_1 = require("./controllers");
describe('Get all posts request', () => {
    let mockRequest;
    let mockResponse;
    let nextFunction = jest.fn();
    let responseObject = {};
    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            statusCode: 0,
            send: jest.fn().mockImplementation((result) => {
                responseObject = result;
            })
        };
    });
    test('200 - getItems', () => __awaiter(void 0, void 0, void 0, function* () {
        const expectedStatusCode = 200;
        controllers_1.getItems(mockRequest, mockResponse, nextFunction);
    }));
    test('200 - getOrders', () => __awaiter(void 0, void 0, void 0, function* () {
        controllers_1.getOrders(mockRequest, mockResponse, nextFunction);
    }));
    test('201 - Create order', () => __awaiter(void 0, void 0, void 0, function* () {
        //createOrder(({client_name: 'Juan'} as Request), mockResponse as Response, nextFunction);        
    }));
    test('200 - getOrders', () => __awaiter(void 0, void 0, void 0, function* () {
        controllers_1.getOrders(mockRequest, mockResponse, nextFunction);
    }));
    test('200 - getOrders', () => __awaiter(void 0, void 0, void 0, function* () {
        controllers_1.getOrders(mockRequest, mockResponse, nextFunction);
    }));
});
