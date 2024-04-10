const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const txSchema = new Schema({
    date: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    cotation: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    fees: {
        type: Number,
        required: true,
    },
    tx: {
        type: String,
        required: true,
    },
    track: {
        type: Boolean,
        required: true,
    },
    olderCotation: {
        type: Number,
        required: true,
    }
})

const tokenSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    realizedProfit: {
        type: Number,
        required: true,
    },
    costByToken: {
        type: Number,
        required: true,
    },
})

const blockchainSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    inUse:{
        type: Boolean,
        required: true,
    },
    listToken: {
        type: [tokenSchema],
        required: true,
    },
})

const walletSchema = new Schema({
    address: {
        type: String,
        required: true,
        unique: true,
    },
    fiatIn: {
        type: Number,
        required: true,
    },
    fiatOut: {
        type: Number,
        required: true,
    },
    realizedProfit: {
        type: Number,
        required: true,
    },
    listBlockchain: {
        type: [blockchainSchema],
        required: true,
    },
    listTx: {
        type: [txSchema],
        required: true,
    },
    lastDateScan: {
        type: String,
        required: true,
    } 
})

module.exports = mongoose.model("tx", txSchema);
module.exports = mongoose.model("token", tokenSchema);
module.exports = mongoose.model("blockchain", blockchainSchema);
module.exports = mongoose.model("wallet", walletSchema);
