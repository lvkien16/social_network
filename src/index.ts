import express from 'express';
import connectDatabase from './configs/database';
import routes from "./routes/index.route";
import { errorMiddleware } from './utils/error';
import bodyParser from 'body-parser';

connectDatabase();

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use("/api", routes);
app.use(errorMiddleware);

app.listen(3001, () => {
    console.log(`Server is running on port 3001`);
});