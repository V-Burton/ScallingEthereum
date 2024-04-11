const express = require("express");
const {
    increaseFiatIn,
    getFiatIn,
    increaseFiatOut,
    getFiatOut,
    getRealizeProfit,
    getBlockchainNames,
    findWalletByAddress,
    getValueOfWallet,
    getTotalUnrealizedProfit,
    getPartOfBlockchainInPotfolio,
    getCotation
} = require("../controllers/mainDashboard/processData");

const Wallet = require("../models/models");

const router = express.Router();

router.get("/fiatIn/:address", getFiatIn);