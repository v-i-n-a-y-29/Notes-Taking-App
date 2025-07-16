const express =require('express')
const path=require('path')
const app=express()
const fs=require('fs')

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))


app.get('/',(req,res)=>{
    fs.readdir(`./files`,(err,files)=>{
        res.render("index",{files:files})
    })
})

app.post('/create',(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details,(err)=>{
        res.redirect('/')
    })
    // console.log(req.body)
})

app.get('/files/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}`,'utf-8',(err,data)=>{
        res.render('show',{ filename : req.params.filename , data})

    })
})

app.get('/edit/:filename', function(req,res){
    res.render('edit' , {title:req.params.filename})
})

app.post('/edit', function(req,res){
    fs.rename(`./files/${req.body.previous}`, `./files/${req.body.new}.txt`, function(err){
        res.redirect('/');
    });
    console.log(req.body)
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});