const Wallet = require("../../models/models");

async function getTokenUnrealizedProfit(tokenName, blockchain, wallet) {
    if (!wallet || !blockchain || !tokenName) {
        throw new Error("One of the arguments is missing");
    }
    let quantity = wallet.listBlockchain[blockchain].listToken[tokenName].quantity;
    let costByToken = wallet.listBlockchain[blockchain].listToken[tokenName].costByToken;
    let actualCotation = getCotation(tokenName);
    let unrealizedProfit = quantity * (actualCotation - costByToken);
    return { tokenUnrealizedProfit: unrealizedProfit };
}

async function getTokenPerformance(tokenName, blockchain, wallet) {
    if (!wallet || !blockchain || !tokenName) {
        throw new Error("One of the arguments is missing");
    }
    let value = wallet.listBlockchain[blockchain].listToken[tokenName].quantity * getCotation(tokenName);
    let invest = wallet.listBlockchain[blockchain].listToken[tokenName].quantity * wallet.listBlockchain[blockchain].listToken[tokenName].costByToken;
    let performance = value / (invest / 100) - 100;
    return { tokenPerformance: performance };
}

async function getPartOfTokenInPortfolio(tokenName, blockchain, wallet) {
    if (!wallet || !blockchain || !tokenName) {
        throw new Error("One of the arguments is missing");
    }
    let value = 0;
    let cotation = getCotation(tokenName);
    wallet.listBlockchain.forEach((blockchain) => {
        value += blockchain.listToken[tokenName].quantity * cotation;
    });
    let totalValue = await getValueOfWallet(wallet.address);
    let part = value / totalValue;
    return { partOfTokenInPortfolio: part };
}


module.exports = {
    getTokenUnrealizedProfit,
    getTokenPerformance,
    getPartOfTokenInPortfolio
}