const Wallet = require("../../models/models");

async function findWalletByAddress(address) {
    try {
        const findWallet = await Wallet.findOne({ address: address }).exec();

        if (!findWallet) {
            return res.status(500).json({ error: "Wallet not found" });
        }
        res.status(200).json({wallet : findWallet});
    } catch (error) {
        return res.status(500).json({error});
    }
}

async function getValueOfWallet(address) {
    const wallet = await findWalletByAddress(address);
    if (!wallet) {
        return res.status(500).json({ error: "Wallet not found" });
    }

    let value = 0;

    wallet.listBlockchain.forEach((blockchain) => {
        blockchain.listToken.forEach((token) => {
            const costByToken = getCotation(blockchain.name);
            value += token.quantity * costByToken;
        });
    });

    res.status(200).json({getValueOfWallet : value});
}

async function getTotalUnrealizedProfit(address) {
    const wallet = await findWalletByAddress(address);
    if (!wallet) {
        return res.status(500).json({ error: "Wallet not found" });
    }

    let unrealizedProfit = 0;

    wallet.listBlockchain.forEach((blockchain) => {
        blockchain.listToken.forEach((token) => {
            unrealizedProfit += getTokenUnrealizedProfit(token.name, blockchain.name, wallet);
        });
    });

    res.status(200).json({TotalUnrealizedProfit : unrealizedProfit});
}

async function getPartOfBlockchainInPotfolio(blockchainName, address) {
    const wallet = await findWalletByAddress(address);
    if (!wallet) {
        return res.status(500).json({ error: "Wallet not found" });
    }

    let value = 0;
    let totalValue = await getValueOfWallet(address);

    wallet.listBlockchain[blockchainName].listToken.forEach((token) => {
        const cotation = getCotation(token.name);
        value += token.quantity * cotation;
    });

    let part = value / totalValue;
    res.status(200).json({partOfBlockchainInPortfolio : part});

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