const Wallet = require("../../models/models");

async function increaseFiatIn(wallet, amount) {
    if (!wallet) {
        return res.status(500).json({ error: "Wallet doesn't exist" });
    }
    wallet.fiatIn += amount;
    await wallet.save();
    res.status(200).json({"message": "fiat increased"}); 
}

async function getFiatIn(wallet) {
    if (!wallet) {
        return res.status(500).json({ error: "Wallet doesn't exist" });
    }
    res.status(200).json(wallet.fiatIn);
}

async function increaseFiatOut(wallet, amount) {
    if (!wallet) {
        return res.status(500).json({ error: "Wallet doesn't exist" });
    }
    wallet.fiatOut += amount;
    await wallet.save();
    res.status(200).json({"message": "fiat increased"}); 
}

async function getFiatOut(wallet) {
    if (!wallet) {
        return res.status(500).json({ error: "Wallet doesn't exist" });
    }
    res.status(200).json(wallet.fiatOut);
}

async function getRealizeProfit(wallet) {
    if (!wallet) {
        return res.status(500).json({ error: "Wallet doesn't exist" });
    }
    let realized = 0;
    wallet.blockchains.forEach((blockchain) => {
        blockchain.tokens.forEach((token) => {
            realized += token.realizeProfit;
        });
    });
    res.status(200).json({realizedProfit : realized});
}

async function getBlockchainNames(wallet) {
    if (!wallet) {
        return res.status(500).json({ error: "Wallet doesn't exist" });
    }
    const blockchainN = wallet.listBlockchain
        .filter( blockchain => blockckain.inUse)
        .map(blockchain => blockchain.name);
        res.status(200).json({blockchainName: blockchainN});
}

module.exports = {
    increaseFiatIn,
    getFiatIn,
    increaseFiatOut,
    getFiatOut,
    getRealizeProfit,
    getBlockchainNames
}