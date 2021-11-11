const express = require("express");
const recordRouter = require("./routes/record.routes")
const PORT_BE = process.env.PORT || 8000;
const PORT_UI = 8001;
const app = express();
app.use(express.json())
app.use("/api", recordRouter)
app.use(express.static(require('path').resolve(__dirname, '..', "frontend")));

app.listen(PORT_UI, () => console.log(`frontend started on port:  ${PORT_UI}`));
app.listen(PORT_BE, () => console.log(`server started on port: ${PORT_BE} `))