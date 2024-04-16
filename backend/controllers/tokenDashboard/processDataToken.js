const Wallet = require("../../models/models");
const { findWalletByAddress } = require("../mainDashboard/processData");
const { getCotation } = require("../mainDashboard/fixData");
const { getValueOfWallet } = require("../mainDashboard/processData");


// async function getTokenUnrealizedProfit(tokenName, blockchain, wallet) {
//     if (!wallet || !blockchain || !tokenName) {
//         throw new Error("One of the arguments is missing");
//     }
//     let quantity = wallet.listBlockchain[blockchain].listToken[tokenName].quantity;
//     let costByToken = wallet.listBlockchain[blockchain].listToken[tokenName].costByToken;
//     let actualCotation = getCotation(tokenName);
//     let unrealizedProfit = quantity * (actualCotation - costByToken);
//     return { tokenUnrealizedProfit: unrealizedProfit };
// }

const getTokenUnrealizedProfit = async (req, res) => {
    const {address} = req.params;
    const {tokenName, blockchainName} = req.body;
    try {
        const result = await findWalletByAddress(address);
        const wallet = result.wallet;
        console.log(wallet.listBlockchain.get(blockchainName));
        const quantity = wallet.listBlockchain.get(blockchainName).listToken.get(tokenName).quantity;
        const costByToken = wallet.listBlockchain.get(blockchainName).listToken.get(tokenName).costByToken;
        const actualCotation = 400;
        const unrealizedProfit = quantity * (actualCotation - costByToken);
        res.status(200).json(unrealizedProfit);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// async function getTokenPerformance(tokenName, blockchain, wallet) {
//     if (!wallet || !blockchain || !tokenName) {
//         throw new Error("One of the arguments is missing");
//     }
//     let value = wallet.listBlockchain[blockchain].listToken[tokenName].quantity * getCotation(tokenName);
//     let invest = wallet.listBlockchain[blockchain].listToken[tokenName].quantity * wallet.listBlockchain[blockchain].listToken[tokenName].costByToken;
//     let performance = value / (invest / 100) - 100;
//     return { tokenPerformance: performance };
// }

const getTokenPerformance = async (req, res) => {
    const {address} = req.params;
    const {tokenName, blockchainName} = req.body;
    try {
        const result = await findWalletByAddress(address);
        const wallet = result.wallet;
        const value = wallet.listBlockchain.get(blockchainName).listToken.get(tokenName).quantity * getCotation(tokenName);
        const invest = wallet.listBlockchain.get(blockchainName).listToken.get(tokenName).quantity * wallet.listBlockchain.get(blockchainName).listToken.get(tokenName).costByToken;
        const performance = value / (invest / 100) - 100;
        res.status(200).json(performance);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// async function getPartOfTokenInPortfolio(tokenName, blockchain, wallet) {
//     if (!wallet || !blockchain || !tokenName) {
//         throw new Error("One of the arguments is missing");
//     }
//     let value = 0;
//     let cotation = getCotation(tokenName);
//     wallet.listBlockchain.forEach((blockchain) => {
//         value += blockchain.listToken[tokenName].quantity * cotation;
//     });
//     let totalValue = await getValueOfWallet(wallet.address);
//     let part = value / totalValue;
//     return { partOfTokenInPortfolio: part };
// }

const getPartOfTokenInPortfolio = async (req, res) => {
    const {address} = req.params;
    const {tokenName, blockchainName} = req.body;
    try{
        const result = await findWalletByAddress(address);
        const wallet = result.wallet;
        // const cotation = getCotation(tokenName);
        const cotation = 400;
        let value = 0;
        wallet.listBlockchain.forEach((blockchain) => {
            if (blockchain.listToken.get(tokenName) != undefined) {
                value += (blockchain.listToken.get(tokenName).quantity * cotation);
                console.log(value);
            }
        });
        console.log("je suis ici");
        const totalValue = await getValueOfWallet(address);
        const part = value / totalValue;
        res.status(200).json(part);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    getTokenUnrealizedProfit,
    getTokenPerformance,
    getPartOfTokenInPortfolio
}