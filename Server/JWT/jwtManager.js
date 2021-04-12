const jwt = require("jsonwebtoken");
const secret = "secret";

class JwtManager {
  generate(data) {
    // generate JWT
    const token = jwt.sign(data, secret);
    console.log(token);
    return token;
  }

  verify(token) {
    // verification
    const data = jwt.verify(token, secret);
    return data;
  }
}

module.exports = new JwtManager();
