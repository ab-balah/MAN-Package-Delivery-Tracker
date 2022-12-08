

const express =require('express')
const sqlite3= require('better-sqlite3')
const app = express()

const nunjucks = require('nunjucks')


app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({extended:false}))


nunjucks.configure(
    'views', { express: app} );





app.get('/',(req,res)=>{
     })
      
    




app.use((req,res)=>{
    res.status(404).send('404 not found')
})


app.listen(3000,'localhost',()=>{
    console.log("listining")
})