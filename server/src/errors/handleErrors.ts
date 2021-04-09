import {NextFunction, Request, Response} from 'express';
const errorHandle = (e: Error,req:Request ,res: Response ,next: NextFunction) => {
   res.status(500).send({error:e})
}

export default  errorHandle;
