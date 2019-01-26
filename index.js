const express = require('express')
const app = express()
const port = 3000
const routes=require('./routes')
const api=require('./api')

app.listen(port);

app.use(api)
app.use(routes)






