import express, {Application} from 'express';
require('dotenv').config({ path: __dirname+'/.env' });
import helmet from "helmet";
const app: Application = express();
import cors from 'cors'
import routes from './routes/routes'
import handleErrors from './errors/handleErrors'

app.use(cors())
app.use(helmet())
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('port',4300)

//Routes
app.use(routes);

// Error handles
app.use(handleErrors);

app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`)
});

export default app;
