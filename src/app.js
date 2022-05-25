import chalk from 'chalk';
import cors from 'cors'
import express, {json} from "express";
import router from "./routes/index.js";

const app = express()

app.use(json())
app.use(cors())
app.use(router)

const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(chalk.bold.blue("Server is running on port ", port))
})