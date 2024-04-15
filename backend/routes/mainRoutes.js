const express = require("express");
const {
    // increaseFiatIn,
    getFiatIn,
    // increaseFiatOut,
    // getFiatOut,
    // getRealizeProfit,
    // getBlockchainNames,
    // findWalletByAddress,
    // getValueOfWallet,
    // getTotalUnrealizedProfit,
    // getPartOfBlockchainInPotfolio,
    // getCotation
} = require("../controllers/mainDashboard/fixData");

const Wallet = require("../models/models");

const router = express.Router();

//router.get("/fiatIn/:address", async (req, res) => {
//    try {
//        const {address} = req.params;
//        const result = await getFiatIn(req, res);
//        res.json(result);
//    } catch (error) {
//        console.log(error);
//    }
//});

router.get("/fiatIn/:address", getFiatIn);

module.exports = router;
