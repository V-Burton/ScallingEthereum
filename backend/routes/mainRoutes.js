const express = require("express");
const {
    // increaseFiatIn,
    getFiatIn,
    // increaseFiatOut,
    getFiatOut,
    getRealizeProfit,
    getBlockchainNames,
    // findWalletByAddress,
    // getCotation
} = require("../controllers/mainDashboard/fixData");

const {
    getValueOfWallet,
    getTotalUnrealizedProfit,
    getPartOfBlockchainInPotfolio,
} = require("../controllers/mainDashboard/processData");

const {
    getTokenUnrealizedProfit,
    getTokenPerformance,
    getPartOfTokenInPortfolio,
} = require("../controllers/tokenDashboard/processDataToken");

const router = express.Router();

router.get("/getFiatIn/:address", getFiatIn);

router.get("/getBlockchainNames/:address", getBlockchainNames);

router.get("/getFiatOut/:address", getFiatOut);

router.get("/getRealizeProfit/:address", getRealizeProfit);

router.get("/getValueOfWallet/:address", getValueOfWallet);

router.get("/getTotalUnrealizedProfit/:address", getTotalUnrealizedProfit);

//Need a blochainName in the body
router.get("/getPartOfBlockchainInPotfolio/:address", getPartOfBlockchainInPotfolio);

//Need a tokenName and a blockchainName in the body
router.get("/getTokenUnrealizedProfit/:address", getTokenUnrealizedProfit);

//Need a tokenName and a blockchainName in the body
router.get("/getTokenPerformance/:address", getTokenPerformance);

//Need a tokenName and a blockchainName in the body
router.get("/getPartOfTokenInPortfolio/:address", getPartOfTokenInPortfolio);

module.exports = router;
