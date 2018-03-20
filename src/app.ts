import express = require("express");
const cors = require('express-cors');
import path = require("path");
import Middlewares = require("./app_api/middlewares/MiddlewaresBase");

var app = express();
var port = parseInt(process.env.PORT, 10) || 2000;
app.set("port", port);
app.use(cors({
	allowedOrigins: [
		'http://localhost:3000'
	]
}))
app.use(
	express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
  );
app.use(Middlewares.configuration);

app.use((req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, "index.html"));
});
/* app.listen(port, () => {
    console.log("Node app is running at localhost:" + port);
}); */

export default app;