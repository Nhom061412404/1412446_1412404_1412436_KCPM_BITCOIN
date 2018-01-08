const ursa = require('ursa');
const crypto = require('crypto');
const HASH_ALGORITHM = 'sha256';
const privateKey  = require('./jwt-key').privateKey;
// SHA256 hash
let hash = (data)  => {
    let hash = crypto.createHash(HASH_ALGORITHM);
    hash.update(data);
    return hash.digest();
};

let generateKey = () => {
    // Same as openssl genrsa -out key-name.pem <modulusBits>
    return ursa.generatePrivateKey(1024, 65537);
};

let generateAddress = () => {
    let privateKey = generateKey();
    let publicKey = privateKey.toPublicPem();
    return {
      privateKey: privateKey.toPrivatePem('hex'),
      publicKey: publicKey.toString('hex'),
      // Address is hash of public key
      address: hash(publicKey).toString('hex')
    };
};

let generateTimeEmailToken = (email) => {
    const cipher = crypto.createCipher('aes-256-ctr', privateKey);
    let hashToken = cipher.update(new Date().getTime()+ '-' + email, 'utf8', 'hex');
    hashToken += cipher.final('hex').toString();

    return hashToken;
}

let decryptTimeEmailToken = (encryptedToken) => {
    const decipher = crypto.createDecipher('aes-256-ctr', privateKey);
    let decrypted = decipher.update(encryptedToken, 'hex', 'utf8');
    decrypted += decipher.final('utf8').toString();

    return decrypted;
}

exports.generateAddress = generateAddress;
exports.generateTimeEmailToken = generateTimeEmailToken;
exports.decryptTimeEmailToken = decryptTimeEmailToken;