const Wallet = require("../../models/models");
const { findWalletByAddress } = require("./processData");

async function increaseFiatIn(wallet, amount) {
    if (!wallet) {
        throw new Error("Wallet doesn't exist");
    }
    wallet.fiatIn += amount;
    await wallet.save();
    return { message: "fiat increased", wallet };
}

//async function getFiatIn(req, res) {
//    const { address } = req.params;
//    try{
//        const wallet = await findWalletByAddress(address);
//        console.log(wallet);
//        console.log(wallet.wallet.fiatIn);
//        res.status(200).json({ fiatIn: wallet.fiatIn });
//    } catch {
//        return res.status(500).json({ message: "Internal server error" });
//    }
//    // return { fiatIn: wallet.fiatIn };
//}

const getFiatIn = async (req, res) => {
    const { address } = req.params;
    try{
        const wallet = await findWalletByAddress(address);
        console.log(wallet);
        console.log(wallet.wallet.fiatIn);
        res.status(200).json({ fiatIn: wallet.fiatIn });
    } catch {
        return res.status(500).json({ message: "Internal server error" });
    }
    // return { fiatIn: wallet.fiatIn };
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