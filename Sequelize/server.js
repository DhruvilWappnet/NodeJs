const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = 8080;

const router=require('./routes/studentRoutes.js')
app.use('/api/students',router);


app.use('/', (req, res) => {
    res.json({ operation: "Successed" });
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})