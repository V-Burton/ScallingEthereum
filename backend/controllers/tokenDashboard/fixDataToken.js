const Wallet = require("../../models/models");

async function increaseQuantityOfToken(tokenName, blockchain, wallet, quantity) {
    if (!wallet || !blockchain || !tokenName) {
        throw new Error("One of the arguments is missing");
    }
    wallet.listBlockchain[blockchain].listToken[tokenName].quantity += quantity;
    await wallet.save();
    return { message: "quantity increased", wallet };
}

async function decreaseQuantityOfToken(tokenName, blockchain, wallet, quantity) {
    if (!wallet || !blockchain || !tokenName) {
        throw new Error("One of the arguments is missing");
    }
    wallet.listBlockchain[blockchain].listToken[tokenName].quantity -= quantity;
    await wallet.save();
    return { message: "quantity decreased", wallet };
}

async function getQuantityOfToken(tokenName, blockchain, wallet) {
    if (!wallet || !blockchain || !tokenName) {
        throw new Error("One of the arguments is missing");
    }
    return { quantity: wallet.listBlockchain[blockchain].listToken[tokenName].quantity };
}

async function increaseRealizedProfit(tokenName, blockchain, wallet, amount) {
    if (!wallet || !blockchain || !tokenName) {
        throw new Error("One of the arguments is missing");
    }
    wallet.listBlockchain[blockchain].listToken[tokenName].realizeProfit += amount;
    await wallet.save();
    return { message: "realized profit increased", wallet };
}

async function getRealizedProfit(tokenName, blockchain, wallet) {
    if (!wallet || !blockchain || !tokenName) {
        throw new Error("One of the arguments is missing");
    }
    return { realizedProfit: wallet.listBlockchain[blockchain].listToken[tokenName].realizeProfit };
}

async function updateCostByToken(tokenName, blockchain, wallet, tx) {
    if (!wallet || !blockchain || !tokenName || !tx) {
        throw new Error("One of the arguments is missing");
    }
    let quantity = wallet.listTx[tx].quantity;
    let value = wallet.listTx[tx].value;
    let costByToken = wallet.listBlockchain[blockchain].listToken[tokenName].costByToken;
    let walletQuantity = wallet.listBlockchain[blockchain].listToken[tokenName].quantity;
    if (tx.type == "buy") {
        wallet.listBlockchain[blockchain].listToken[tokenName].costByToken = (value + walletQuantity * costByToken) / (walletQuantity + quantity);
        wallet.listBlockchain[blockchain].listToken[tokenName].quantity += quantity;
    } else {
        //Gestion des profits realise dans la fonction superieur.
        wallet.listBlockchain[blockchain].listToken[tokenName].costByToken = (walletQuantity * costByToken - value) / (walletQuantity - quantity);
        wallet.listBlockchain[blockchain].listToken[tokenName].quantity += quantity;
    }
    await wallet.save();
    return { message: "cost by token updated", wallet };
}


module.exports = {
    increaseQuantityOfToken,
    decreaseQuantityOfToken,
    getQuantityOfToken,
    increaseRealizedProfit,
    getRealizedProfit,
    updateCostByToken
}