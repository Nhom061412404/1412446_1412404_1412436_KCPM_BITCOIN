const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Block = new Schema({
    hash: {type: String, required: true, unique: true},
    nonce: {type: Number, required: true},
    timestamp: {type: Number, required: true},
    difficulty: {type: Number, required: true},
    transactions: [new Schema({
        hash: {type: String, required: true, unique: true},
        version: {type: Number, required: true},
        inputs: [new Schema({
            unlockScript: {type: String, required: true},
            referencedOutputHash: {type: String, required: true},
            referencedOutputIndex: {type: Number, required: true}
        }, {_id: false})],
        outputs: [new Schema({
            value: {type: Number, required: true},
            lockScript: {type: String, required: true}
        }, {_id: false})]
    }, {_id: false})],
    transactionsHash: {type: String, required: true},
    previousBlockHash: {type: String, required: true}
});


module.exports = mongoose.model('Block', Block);