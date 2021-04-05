import express, {Application} from 'express';
require('dotenv').config({ path: __dirname+'/.env' });
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('port',4300)

app.get('/', (req: express.Request,res: express.Response) => {
  res.send("Hello word")
})
app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`)
});
