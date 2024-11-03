import { pbkdf2 } from 'crypto';

//password, salt, iterations, 64, 'sha512'
export const hashPassword = (password, salt) =>
    new Promise((resolve, reject) => {
      pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {   
        if (err) reject(err);
        resolve(derivedKey.toString('hex'));
      });
    });
  