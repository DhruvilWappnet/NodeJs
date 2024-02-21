const express = require('express');
const app = express();
// require('dotenv').config();
const PORT = 8080;

app.use(express.json());

const router1=require('./routes/userRoutes.js');
app.use('/api/user',router1);

const router2=require('./routes/postRoutes.js');
app.use('/api/post',router2);

app.use('/', (req, res) => {
    res.json({ operation: "Successed" });
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})