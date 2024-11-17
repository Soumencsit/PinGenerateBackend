
import express from 'express'

import { sendMassage} from '../controllers/userController.js';  // Note the `.js` extension

const createRoute=express.Router();

createRoute.post('/sendmessage',sendMassage)



export default createRoute;
