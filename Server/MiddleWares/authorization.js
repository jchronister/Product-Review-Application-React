const jwtManager = require("../JWT/jwtManager");

class Permission {
  givePermission(req, res, next) {
    if (req.url === "/auth/login") {
      next();
      return;
    }
    const token = req.headers.authorization;
    if (!token) {
      return res.json("Authorization Err");
    } else {
      const verifiedToken = jwtManager.verify(token);
      if (!verifiedToken) {
        return res.json("Authorization err");
      }
      req.role = verifiedToken.role;
      req.email = verifiedToken.email;

      next();
    }
  }
  isSuper(req,res,next){
    if(req.role !== 'superuser'){
      return res.json('authorization err')
    }
    next()
  }
}

module.exports = new Permission()