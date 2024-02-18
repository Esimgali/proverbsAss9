const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const path = require('path');
app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'main.html'));
});
app.get('/proverbs', (req, res) => {
    res.sendFile(path.join(__dirname,'proverbs.html'));
});
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,'login.html'));
});
app.get('/reg', (req, res) => {
    res.sendFile(path.join(__dirname,'reg.html'));
});
app.get('/aboutUs', (req, res) => {
    res.sendFile(path.join(__dirname,'aboutUs.html'));
});
app.get('/profile', (req, res) => {
    res.sendFile(path.join(__dirname,'profile.html'));
});
app.get('/adminPage', (req, res) => {
    res.sendFile(path.join(__dirname,'adminPage.html'));
});

app.post('/login', (req, res)=>{
    
})

app.post('/reg', (req, res)=>{

})

app.get('/getProverbs', (req, res)=>{

})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});