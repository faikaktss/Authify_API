import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import bcrypt from "bcrypt";
import { PrismaClient } from "./generated/prisma";
import { Strategy as LocalStrategy } from 'passport-local';
import passport from "passport";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY as string,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { username } });
      if (!user) {
        return done(null, false);
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return done(null, false);
      }

      return done(null, username);
    } catch (error) {   
    return done(error,false)
    }
  })
);

passport.serializeUser((user,done)=>{
    done(null,user.id);
})

passport.deserializeUser(async (id, done) =>{
    try {
        const user = await prisma.user.findUnique({where: {id}});
        done(null,user);
    } catch (error) {
        done(error,false);
    }
})



app.post('/api/login',passport.authenticate('local', {
    successRedirect:"/api";
}))

const isAuthentication = (req,res,next) =>{
    if(req.isAuthentication()){
        return next();
    }
    res.status(401).json({message:'Lütfen oturum açın'});
}

app.get('/api',(req,res) =>{
    res.json(req.user);
})

app.get('/api/logout',(req,res) =>{
    req.logOut(err=>{
        if(err){    
            res.status(400).json({message:"Çıkış işlemi sırasında bir hata oluştu"})
        }   
        res.status(200).json({message:"Çıkış işlemi başarılı"});
    })
})


app.get("/", (req, res) => {
  res.json({ message: "API çalışıyor" });
});

app.post("/api/register", async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, role, password: hashedPassword },
    });
    res.status(201).json({ message: "Ekleme başarılı" });
  } catch (error) {
    console.log(error);
    res.status(404).json({ data: "Bilgiler kaydedilemedi" });
  }
});

app.listen(PORT, () => {
  console.log("Sunucu ayağa kalktı!!!");
});
