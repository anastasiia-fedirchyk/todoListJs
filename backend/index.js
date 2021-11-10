const express = require("express");
const recordRouter = require("./routes/record.routes")
const PORT = process.env.PORT || 8000;
const app = express();
app.use(express.json())
app.use("/api", recordRouter)


app.listen(PORT, () => console.log(`server started on port: ${PORT} `))