const bcrypt = require('bcrypt');

// async function hashPassword(plainTextPassword) {
//   const salt = await bcrypt.genSalt(10);
//   const hash = await bcrypt.hash(plainTextPassword, salt);
//   console.log(hash);
// }

// hashPassword('newpassword');

async function verifyPassword(plainTextPassword, storedHash) {
  const isMatch = await bcrypt.compare(plainTextPassword, storedHash);
  console.log(isMatch ? 'Password is correct.' : 'Password is incorrect.');
}

// Example stored hash (from your backend) for the password "password"
const storedHash = '$2b$10$M/NKSMGoZFZEqZJ3m8JHxuwIBanXK53QWTJ82wP3Ug7sf6hH/XalW'; // Example hash

verifyPassword('newpassword', storedHash);