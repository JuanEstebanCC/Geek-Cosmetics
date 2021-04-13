import { Request, Response, NextFunction } from 'express';
require('mysql2/node_modules/iconv-lite').encodingExists('foo');
import {getItems, getOrders, createOrder,editOrders,updateItems} from './controllers';

describe('Get all posts request', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
        let nextFunction: NextFunction = jest.fn();

    let responseObject = {}
    beforeEach(() => {
        mockRequest = {
        };
        mockResponse = {
            statusCode: 0,
            send: jest.fn().mockImplementation((result) => {
                responseObject = result;
            })
        };
    });

    test('200 - getItems', async () => {
        const expectedStatusCode = 200;

        getItems(mockRequest as Request, mockResponse as Response, nextFunction);        
    });
    test('200 - getOrders', async () => {
        getOrders(mockRequest as Request, mockResponse as Response, nextFunction);        
    }) 

    test('201 - Create order', async () => {
        //createOrder(({client_name: 'Juan'} as Request), mockResponse as Response, nextFunction);        
    }) 
    
    test('200 - getOrders', async () => {
        getOrders(mockRequest as Request, mockResponse as Response, nextFunction);        
    }) 
    test('200 - getOrders', async () => {
        getOrders(mockRequest as Request, mockResponse as Response, nextFunction);        
    }) 
});
