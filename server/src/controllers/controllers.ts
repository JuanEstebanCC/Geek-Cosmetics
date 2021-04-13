
import {Request, Response, NextFunction} from 'express';
import { QueryError, RowDataPacket} from 'mysql2';
import * as Joi from 'joi'
import {connection} from '../database/db';
import * as mysql from 'mysql2/promise';
import {
  ContainerTypes,
  // Use this as a replacement for express.Request
  ValidatedRequest,
  // Extend from this to define a valid schema type/interface
  ValidatedRequestSchema,
  // Creates a validator that generates middlewares
} from 'express-joi-validation'


interface HelloRequestSchema extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    client_name: string
  }
}

interface EditOrderRequest extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    order_num: number,
    subtotal: number,
    iva: number,
    total: number
  }
}

interface EditItemsReques extends ValidatedRequestSchema {
  [ContainerTypes.Query]: {
    descripcion: string,
    existencia: number
  }
}
export const getItems = async(req: Request, res: Response, next: NextFunction ) => {
   try{

  connection.query('SELECT * FROM  items', (err: QueryError, rows: RowDataPacket[]) => {
    res.status(200).json(rows);
});
   }catch(e){

    console.log(e)
    next(e)
   }

}
// Get's


export const getOrders = (req: Request,res: Response, next: NextFunction) => {

  try{

  connection.query('SELECT * FROM  orders', (err: QueryError, rows: RowDataPacket[]) => {
    res.status(200).json(rows);
});
  }catch(e){

    console.log(e)
    next(e)
  }
}



//Post's
export const createOrder =  async(req: ValidatedRequest<HelloRequestSchema>,res: Response, next: NextFunction) => {
  try{
    const {client_name} = req.body
    connection.query('INSERT INTO orders (client_name) VALUES(?)',[client_name], function (err, results) {
      res.status(200).json(results)
});
  }catch(e){

    console.log(e)
    next(e)
  }

}

//Put's
export const editOrders = async(req: ValidatedRequest<EditOrderRequest>,res: Response, next:NextFunction) => {
  try{
    const {order_num,subtotal,iva,total} = req.body
    connection.query('UPDATE orders SET subtotal = ?, iva = ?, total = ? WHERE order_num = ?',[subtotal,iva,total,order_num], function (err, results) {
      res.status(200).json(results)
});
  }catch(e){

    console.log(e)
    next(e)
  }
}



export const updateItems = async(req: ValidatedRequest<EditItemsReques>,res: Response, next:NextFunction) => {
  try{

    const {descripcion,existencia} = req.body

    connection.query('UPDATE items SET existencia = ? WHERE descripcion = ?',[existencia,descripcion], function (err, results) {
      res.status(200).json(results)
});
  }catch(e){

    console.log(e)
    next(e)
  }
}

