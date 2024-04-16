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

const getValueOfWallet = async (req, res) => {
    const { address } = req.params;
    try {
        const result = await findWalletByAddress(address);
        const wallet = result.wallet;
        let value = 0;
        wallet.listBlockchain.forEach((blockchain) => {
            blockchain.listToken.forEach((token) => {
                const cotation = getCotation(token.name);
                value += token.quantity * cotation;
            });
        });
        res.status(200).json({ getValueOfWallet: value });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getTotalUnrealizedProfit = async (req, res) => {
    const { address } = req.params;
    try {
        const result = await findWalletByAddress(address);
        const wallet = result.wallet;
        let unrealizedProfit = 0;
        wallet.listBlockchain.forEach((blockchain) => {
            blockchain.listToken.forEach((token) => {
                unrealizedProfit += getTokenUnrealizedProfit(token.name, blockchain.name, wallet);
            });
        });
        res.status(200).json({ TotalUnrealizedProfit: unrealizedProfit });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const getPartOfBlockchainInPotfolio = async (req, res) => {
    const {address} = req.params;
    const {blockchainName} = req.body;

    try {
        const result = await findWalletByAddress(address);
        const wallet = result.wallet;
        let value = 0;
        let totalValue = (await getValueOfWallet(address)).getValueOfWallet;
        wallet.listBlockchain[blockchainName].listToken.forEach((token) => {
            const cotation = getCotation(token.name);
            value += token.quantity * cotation;
        });
        let part = value / totalValue;
        res.status(200).json({ partOfBlockchainInPortfolio: part });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
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