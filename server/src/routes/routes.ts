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


// Import routes
import {getItems, getOrders, createOrder, editOrders, updateItems} from '../controllers/controllers'


// Create validation schemas
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

// Set endpoints
router.get('/items', getItems)
router.get('/orders', getOrders)
router.post('/orders/new', validator.body(querySchema),createOrder)
router.put('/orders/edit',validator.body(querySchemaEdit), editOrders)
router.put('/items/edit', validator.body(querySchemaEditItems), updateItems)


// Export router
export default router;
