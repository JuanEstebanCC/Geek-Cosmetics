import express, {Application} from 'express';
require('dotenv').config({ path: __dirname+'/.env' });
const app: Application = express();
import { QueryError, RowDataPacket} from 'mysql2';
import {connection} from './database/db';

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('port',4300)

app.get('/', (req: express.Request,res: express.Response) => {
  connection.query('SELECT * FROM  orders', (err: QueryError, rows: RowDataPacket[]) => {
    console.log('The solution is: ', rows);
  res.send("Hello word"+rows)
});

})
app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`)
});
