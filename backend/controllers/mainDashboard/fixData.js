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
        const result = await findWalletByAddress(address);
        const wallet = result.wallet;
        res.status(200).json({ fiatIn: wallet.fiatIn });
    } catch {
        return res.status(500).json({ message: "Internal server error" });
    }
}


async function increaseFiatOut(wallet, amount) {
    if (!wallet) {
        throw new Error("Wallet doesn't exist");
    }
    wallet.fiatOut += amount;
    await wallet.save();
    return { message: "fiat increased", wallet };
}

// async function getFiatOut(wallet) {
//     if (!wallet) {
//         throw new Error("Wallet doesn't exist");
//     }
//     return { fiatOut: wallet.fiatOut };
// }

const  getFiatOut = async (req, res) => {
    const { address } = req.params;
    try {
        const result = await findWalletByAddress(address);
        const wallet = result.wallet;
        res.status(200).json({ fiatOut: wallet.fiatOut });
    } catch {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getRealizeProfit = async (req, res) => {
    const { address } = req.params;
    try {
        const wallet = await findWalletByAddress(address);
        let realized = 0;
        wallet.blockchains.forEach((blockchain) => {
            blockchain.tokens.forEach((token) => {
                realized += token.realizeProfit;
            });
        });
        res.status(200).json({ realizedProfit: realized });
    } catch {
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getBlockchainNames = async (req, res) => {
    const { address } = req.params;
    try {
        const result = await findWalletByAddress(address);
        const wallet = result.wallet;
        console.log(wallet);
        const blockchainN = wallet.listBlockchain.filter(blockchain => blockchain.inUse).map(blockchain => blockchain.name);
        res.status(200).json({ blockchainNames: blockchainN });
    } catch (error ){
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}


module.exports = {
    increaseFiatIn,
    getFiatIn,
    increaseFiatOut,
    getFiatOut,
    getRealizeProfit,
    getBlockchainNames
}