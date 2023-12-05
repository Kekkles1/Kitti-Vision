const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const port = 3001;
const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/',(req, res) => {
    res.json({"message": "DB3 Application WORKING"});
})

const userRouter = require('./routers/userRouter.js');
const adminRouter = require('./routers/adminRouter.js');
const tvShowRouter= require('./routers/tvShowRouter.js');

app.use('/Users',userRouter);
app.use('/Admins',adminRouter);
app.use('/tvShow',tvShowRouter);



