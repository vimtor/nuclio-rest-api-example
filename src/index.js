import express from "express"
import "express-async-errors"
import errorHandler from "./middlewares/error-handler"
import recipesController from "./controllers/recipe-controller"
import helmet from "helmet"
import rateLimit from "express-rate-limit"
import morgan from "morgan"
import { connect } from "mongoose"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("tiny"))
app.use(helmet())
app.use(rateLimit({ windowMs: 60000, max: 100 }))

app.use("/recipes", recipesController)

app.use(errorHandler)

app.listen(process.env.PORT, () => {
  connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }).then(() => console.log("Connected to MongoDB"))

  console.log(`Listening on http://localhost:${process.env.PORT}`)
})
