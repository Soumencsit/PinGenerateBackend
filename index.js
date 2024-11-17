import express from 'express';
import 'dotenv/config';

import userRoute from './router/userRoute.js';

const app = express();
const PORT = process.env.PORT||5003; 
import cors from 'cors';

app.use(cors());
app.use(express.json());

app.use("/api/user",userRoute)






// Starting the server
app.listen(PORT, () => {
    console.log(`App Running Successfully on PORT ${PORT}`);
});