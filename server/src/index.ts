import express, {Application} from 'express';
require('dotenv').config({ path: __dirname+'/.env' });
const app: Application = express();
import { QueryError, RowDataPacket} from 'mysql2';
import {connection} from './database/db';
import cors from 'cors'
import routes from './routes/routes'

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('port',4300)

app.use(routes);


app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`)
});
