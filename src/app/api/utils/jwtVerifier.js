const jwt = require('jsonwebtoken');

function jwtVerifier(tokenCookie) {
  try {

    const token = tokenCookie.split('token=')[1]

    const { JWT_SECRET } = process.env;

    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const payload = jwt.verify(token, JWT_SECRET);

    const { sub: userId, language } = payload

    return  {userId, language} ; 
  } catch (error) {
    console.error('Error verifying JWT:', error.message);
    return { error: 'Invalid token' }; 
  }
}

module.exports = jwtVerifier;
