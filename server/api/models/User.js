var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    email: {type: String, required: [true, "Email is required"], unique: true},
    pwdHash: {type: String, required: [true, "Password hash is required"]},
    address: [{
        privateKey: {type: String, required: true},
        publicKey: {type: String, required: true},
        address: {type: String, required: true}
    }],
    activeHash: {type: String, default: ''},
    forgotHash: {
        type: String,
        default: ''
    }
});


module.exports = mongoose.model('User', UserSchema);