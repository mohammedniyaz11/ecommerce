const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC, (err, user) => {
      if (err) res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const midllewereforpassword=(req,res,next)=>{
  const{password}=req.body.password
  console.log(password)
  if(password.length>6){
    next();
  }else{
    res.send("password length is to short")
  }
}
const midllewareforemail=(req,res,next)=>{
     const{email}=req.body.email
  const emailvalid  =ValidateEmail(email)
     if(emailvalid){
       next()
     }else{
       res.send("your mail is not valid")
     }
    

}
// passwords = [
//   "1-3 a: abcedf",  # valid
//   "2-4 b: cdefgh",  # invalid
//   “2-9" c: ccccccc"  # valid
// ]






// db.marks.aggregate([{$group:{$student_id:null}},{$sort:[1].limit(3)})








function ValidateEmail(inputText)
{
var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
if(inputText.value.match(mailformat))
{

return true;
}
else
{

return false;
}
}





module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  midllewareforemail,
  midllewereforpassword,
};