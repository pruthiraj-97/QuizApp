const express = require('express');
const path = require('path');
const app = express(); 
const {getQuestains,answarQuestains,submit}=require('./controller')
app.use(express.json())
app.use(express.static('public'));
const PORT=4000
app.get('/',(req,res)=>{
   res.sendFile(path.join(__dirname,'public/index.html'))
})
app.get('/quiz',getQuestains)
app.post('/quiz/answer/:id',answarQuestains)
app.get('/quiz/submit',submit)

app.listen(PORT,()=>{
   console.log(`server is running on port ${PORT}`)
})