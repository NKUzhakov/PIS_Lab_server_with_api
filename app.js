const express = require('express');
const path = require("path");
const student = require("./controllers/studentController.js");

const port = 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use('/trains', trainRoutes);
// app.use('/admin', adminRoutes);
// app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/student/:login', (req, res) => {
    const reqLogin = req.params.login;
    try{
        const studObj = student.findByLogin(reqLogin);
        res.status(200).json(studObj);
    }catch(err){
        res.status(500).json(err);
    }    
});

app.listen(port, () => {
    console.log(`Server has been started on adress http://localhost:${port}`);    
});