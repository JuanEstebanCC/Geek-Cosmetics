
import {createConnection, QueryError, RowDataPacket} from 'mysql2';
export const connection = createConnection({
  host: 'localhost',
  user: 'root',
  database: 'geek_cosmetics',
  password: 'LCELMIELV'
});


