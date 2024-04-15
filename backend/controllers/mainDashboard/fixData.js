const Wallet = require("../../models/models");

async function increaseFiatIn(wallet, amount) {
    if (!wallet) {
        throw new Error("Wallet doesn't exist");
    }
    wallet.fiatIn += amount;
    await wallet.save();
    return { message: "fiat increased", wallet };
}

async function getFiatIn(wallet) {
    if (!wallet) {
        throw new Error("Wallet doesn't exist");
    }
    return { fiatIn: wallet.fiatIn };
}

async function increaseFiatOut(wallet, amount) {
    if (!wallet) {
        throw new Error("Wallet doesn't exist");
    }
    wallet.fiatOut += amount;
    await wallet.save();
    return { message: "fiat increased", wallet };
}

async function getFiatOut(wallet) {
    if (!wallet) {
        throw new Error("Wallet doesn't exist");
    }
    return { fiatOut: wallet.fiatOut };
}

async function getRealizeProfit(wallet) {
    if (!wallet) {
        throw new Error("Wallet doesn't exist");
    }
    let realized = 0;
    wallet.blockchains.forEach((blockchain) => {
        blockchain.tokens.forEach((token) => {
            realized += token.realizeProfit;
        });
    });
    return { realizedProfit: realized };
}

async function getBlockchainNames(wallet) {
    if (!wallet) {
        throw new Error("Wallet doesn't exist");
    }
    const blockchainN = wallet.listBlockchain
        .filter(blockchain => blockchain.inUse)
        .map(blockchain => blockchain.name);
    return { blockchainName: blockchainN };
}


module.exports = {
    increaseFiatIn,
    getFiatIn,
    increaseFiatOut,
    getFiatOut,
    getRealizeProfit,
    getBlockchainNames
}