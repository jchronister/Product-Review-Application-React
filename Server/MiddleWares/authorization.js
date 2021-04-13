const jwtManager = require("../JWT/jwtManager");
const createError = require("http-errors");

class Permission {
  givePermission(req, res, next) {
    if (req.url === "/auth/login" || req.url === "/auth/signup") {
      next();
      return;
    }
    const token = req.headers.authorization;
    if (!token) {
      // return res.json("Authorization Err");
      next(createError(404, "No Authorization Token"));
    } else {
      const verifiedToken = jwtManager.verify(token);
      if (!verifiedToken) {
        // return res.json("Authorization err");
        next(createError(404, "Invalid Authorization Token"));
      }
      req.role = verifiedToken.role;
      req.email = verifiedToken.email;

      next();
    }
  }
  isSuper(req,res,next){
    if(req.role !== 'superuser'){
      // return res.json('authorization err')
      next(createError(404, "Not Authorized"));
    }
    next()
  }
}

module.exports = new Permission()