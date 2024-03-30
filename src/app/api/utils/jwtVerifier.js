const jwt = require('jsonwebtoken');

function jwtVerifier(token) {
  try {
    const { JWT_SECRET } = process.env;

    if (!JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const payload = jwt.verify(token, JWT_SECRET);

    const { sub: userId } = payload;

    return  userId ; 
  } catch (error) {
    console.error('Error verifying JWT:', error.message);
    return { error: 'Invalid token' }; 
  }
}

module.exports = jwtVerifier;
