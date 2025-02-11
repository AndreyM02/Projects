const bcrypt = require('bcrypt');

async function hashPassword(plainTextPassword) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(plainTextPassword, salt);
  console.log(hash);
}

hashPassword('password');