import {Router} from 'express'
import {Request, Response} from 'express';
import { QueryError, RowDataPacket} from 'mysql2';
import {connection} from '../database/db';
import * as mysql from 'mysql2/promise';
const router = Router();



// Get's
router.get('/items', (req: Request,res: Response, next) => {

  try{
  connection.query('SELECT * FROM  items', (err: QueryError, rows: RowDataPacket[]) => {
    res.status(200).json(rows);
});
  }catch(e){
    console.log(e)
    next(e)
  }
})

router.get('/orders', (req: Request,res: Response, next) => {

  try{
  connection.query('SELECT * FROM  orders', (err: QueryError, rows: RowDataPacket[]) => {
    res.status(200).json(rows);
});
  }catch(e){
    console.log(e)
    next(e)
  }
})


//Post's
router.post('/orders/new', async(req: Request,res: Response, next) => {

  try{

    const {client_name} = req.body
    connection.query('INSERT INTO orders (client_name) VALUES(?)',[client_name], function (err, results) {
      res.status(200).json(results)
});
  }catch(e){
    console.log(e)
    next(e)
  }
})

//Put's
router.put('/orders/edit', async(req: Request,res: Response, next) => {

  try{
    const {order_num,subtotal,iva,total} = req.body

    connection.query('UPDATE orders SET subtotal = ?, iva = ?, total = ? WHERE order_num = ?',[subtotal,iva,total,order_num], function (err, results) {
      res.status(200).json(results)
});
  }catch(e){
    console.log(e)
    next(e)
  }
})


export default router;
