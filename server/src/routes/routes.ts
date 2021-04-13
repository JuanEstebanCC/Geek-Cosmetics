import {Router} from 'express'
import {Request, Response} from 'express';
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
  createValidator
} from 'express-joi-validation'
const validator = createValidator()
const router = Router();


const querySchema = Joi.object({
  client_name: Joi.string().required()
})


const querySchemaEdit = Joi.object({
  order_num: Joi.number().required(),
  subtotal: Joi.number().required(),
  iva: Joi.number().required(),
  total: Joi.number().required()
})

const querySchemaEditItems = Joi.object({
  descripcion: Joi.string().required(),
  existencia: Joi.number().required()
})

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
router.post('/orders/new',validator.body(querySchema), async(req: ValidatedRequest<HelloRequestSchema>,res: Response, next) => {

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
router.put('/orders/edit', validator.body(querySchemaEdit),async(req: ValidatedRequest<EditOrderRequest>,res: Response, next) => {

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


router.put('/items/edit', validator.body(querySchemaEdit),async(req: ValidatedRequest<EditItemsReques>,res: Response, next) => {

  try{
    const {descripcion,existencia} = req.body

    connection.query('UPDATE items SET existencia = ? WHERE descripcion = ?',[existencia,descripcion], function (err, results) {
      res.status(200).json(results)
});
  }catch(e){
    console.log(e)
    next(e)
  }
})
export default router;
