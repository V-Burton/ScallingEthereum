const Wallet = require("../../models/models");

async function findWalletByAddress(address) {
    try {
        const findWallet = await Wallet.findOne({ address: address }).exec();

        if (!findWallet) {
            throw new Error("Wallet not found");
        }
        return { wallet: findWallet };
    } catch (error) {
        throw new Error(error);
    }
}

async function getValueOfWallet(address) {
    const { wallet } = await findWalletByAddress(address);
    if (!wallet) {
        throw new Error("Wallet not found");
    }

    let value = 0;

    wallet.listBlockchain.forEach((blockchain) => {
        blockchain.listToken.forEach((token) => {
            const costByToken = getCotation(blockchain.name);
            value += token.quantity * costByToken;
        });
    });

    return { getValueOfWallet: value };
}

async function getTotalUnrealizedProfit(address) {
    const { wallet } = await findWalletByAddress(address);
    if (!wallet) {
        throw new Error("Wallet not found");
    }

    let unrealizedProfit = 0;

    wallet.listBlockchain.forEach((blockchain) => {
        blockchain.listToken.forEach((token) => {
            unrealizedProfit += getTokenUnrealizedProfit(token.name, blockchain.name, wallet);
        });
    });

    return { TotalUnrealizedProfit: unrealizedProfit };
}

async function getPartOfBlockchainInPotfolio(blockchainName, address) {
    const { wallet } = await findWalletByAddress(address);
    if (!wallet) {
        throw new Error("Wallet not found");
    }

    let value = 0;
    let totalValue = (await getValueOfWallet(address)).getValueOfWallet;

    wallet.listBlockchain[blockchainName].listToken.forEach((token) => {
        const cotation = getCotation(token.name);
        value += token.quantity * cotation;
    });

    let part = value / totalValue;
    return { partOfBlockchainInPortfolio: part };
}


//Baptiste
async function getCotation(tokenName) {
    // This function should return the cotation of the token
    // in the real world, it would be a request to an API
    // or a database query
    return 10;
}

module.exports = {
    findWalletByAddress,
    getValueOfWallet,
    getTotalUnrealizedProfit,
    getPartOfBlockchainInPotfolio,
    getCotation
}