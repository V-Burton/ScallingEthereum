const Wallet = require("../../models/models");

async function getTokenUnrealizedProfit(tokenName, blockchain, wallet) {
    if (!wallet || !blockchain || !tokenName) {
        return res.status(500).json({ error: "One of the argument is missing" });
    }
    let quantity = wallet.listBlockchain[blockchain].listToken[tokenName].quantity;
    let costByToken = wallet.listBlockchain[blockchain].listToken[tokenName].costByToken;
    let actualCotation = getCotation(tokenName);
    let unrealizedProfit = quantity * (actualCotation - costByToken);
    res.status(200).json({tokenUnrealizedProfit : unrealizedProfit});
}

async function getTokenPerformance(tokenName, blockchain, wallet) {
    if (!wallet || !blockchain || !tokenName) {
        return res.status(500).json({ error: "One of the argument is missing" });
    }
    let value = wallet.listBlockchain[blockchain].listToken[tokenName].quantity * getCotation(tokenName);
    let invest = wallet.listBlockchain[blockchain].listToken[tokenName].quantity * wallet.listBlockchain[blockchain].listToken[tokenName].costByToken;
    let performance = value / (invest / 100) - 100;
    res.status(200).json({tokenPerformance : performance});
}

async function getPartOfTokenInPortfolio(tokenName, blockchain, wallet) {
    if (!wallet || !blockchain || !tokenName) {
        return res.status(500).json({ error: "One of the argument is missing" });
    }
    let value = 0;
    let cotation = getCotation(tokenName);
    wallet.listBlockchain.forEach((blockchain) => {
        value += blockchain.listToken[tokenName].quantity * cotation;
    });
    let totalValue = await getValueOfWallet(wallet.address);
    let part = value / totalValue;
    res.status(200).json({partOfTokenInPortfolio : part});
}

module.exports = {
    getTokenUnrealizedProfit,
    getTokenPerformance,
    getPartOfTokenInPortfolio
}