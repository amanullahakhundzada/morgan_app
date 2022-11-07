const express=require("express")
const morgan=require("morgan")
const {v4:uuidv4}=require("uuid")
const fs=require("fs")
const path=require("path")

const app=express()
const PORT=process.env.PORT||3000;

morgan.token('id',function getId(req){
    return req.id
})
morgan.token("param",function(req,res,param){
    return "UserToken"
})
app.use(assignId);

let accessLogStream=fs.createWriteStream(path.join(__dirname,"access.log"),{flag:"a"})

app.use(morgan(":id :param :method :status :url'HTTP/:http-version'"))
app.use(morgan(":id :param :method :status :url'HTTP/:http-version'",{stream:accessLogStream}))
app.get("/",(req,res)=>{ res.end("Morgan Logger app")})

function assignId(req,res,next){
    req.id=uuidv4();
    next();
}

app.listen(PORT,()=>{console.log(`Server Running on http://localhost:${PORT}`);})
