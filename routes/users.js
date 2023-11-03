const express = require('express')
const router = express.Router()

const emailDB = "anirudhjagath@gmail.com";
const passwordDB = "12345";


router.get("/", (req, res) => {
  res.redirect('/home')
});

router.get("/log-in", (req, res) => {
  if (req.session.user) {
    res.render("home");
  }else
  res.render("login", { err: "" });
});


router.get("/home", (req, res) => {
    if (req.session.user) {
      const datas=[{
        name:"Anirudh",
      },
      {
        name:"Arsha",
      },
      {
        name:"Blaaa"
      }
    ]

    
        res.render("home",{datas});
      } else {
        res.redirect("/log-in");
      }
});


router.post("/log-in", (req, res) => {
  
  const cred = req.body;
  if (emailDB === cred.email && passwordDB === cred.password) {
    req.session.user = true;
    res.redirect('/home')
  } else {
    let errormessage;
    if (emailDB !== cred.email && passwordDB === cred.password) {
      errormessage = "email is incorrect";
    } else if (passwordDB !== cred.password && emailDB === cred.email) {
      errormessage = "password is incorrect";
    } else {
      errormessage = "invalid email and password";
    }
    res.render("login", { err: errormessage });
  }
});
router.get('/log-out',(req,res)=>{
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect('/')
})

module.exports = router;
