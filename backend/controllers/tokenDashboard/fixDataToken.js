const Wallet = require("../../models/models");

async function increaseQuantityOfToken(tokenName, blockchain, wallet) {
    if (!wallet || !blockchain || !tokenName) {
        return res.status(500).json({ error: "One of the argument is missing" });
    }
    wallet.listBlockchain[blockchain].listToken[tokenName].quantity++;
    await wallet.save();
    res.status(200).json({"message": "quantity increased"}); 
}

async function decreaseQuantityOfToken(tokenName, blockchain, wallet) {
    if (!wallet || !blockchain || !tokenName) {
        return res.status(500).json({ error: "One of the argument is missing" });
    }
    wallet.listBlockchain[blockchain].listToken[tokenName].quantity--;
    await wallet.save();
    res.status(200).json({"message": "quantity decreased"}); 
}

async function getQuantityOfToken(tokenName, blockchain, wallet) {
    if (!wallet || !blockchain || !tokenName) {
        return res.status(500).json({ error: "One of the argument is missing" });
    }
    res.status(200).json(wallet.listBlockchain[blockchain].listToken[tokenName].quantity);
}

async function increaseRealizedProfit(tokenName, blockchain, wallet, amount) {
    if (!wallet || !blockchain || !tokenName) {
        return res.status(500).json({ error: "One of the argument is missing" });
    }
    wallet.listBlockchain[blockchain].listToken[tokenName].realizeProfit += amount;
    await wallet.save();
    res.status(200).json({"message": "realized profit increased"}); 
}

async function getRealizedProfit(tokenName, blockchain, wallet) {
    if (!wallet || !blockchain || !tokenName) {
        return res.status(500).json({ error: "One of the argument is missing" });
    }
    res.status(200).json(wallet.listBlockchain[blockchain].listToken[tokenName].realizeProfit);
}

async function updateCostByToken(tokenName, blockchain, wallet, tx) {
    if (!wallet || !blockchain || !tokenName || !tx) {
        return res.status(500).json({ error: "One of the argument is missing" });
    }
    let quantity = wallet.listTx[tx].quantity;
    let cotation = wallet.listTx[tx].cotation;
    let value = wallet.listTx[tx].value;
    let costByToken = wallet.listBlockchain[blockchain].listToken[tokenName].costByToken;
    let walletQuantity = wallet.listBlockchain[blockchain].listToken[tokenName].quantity;
    if (wallet.listTx[type] == "buy") {
        wallet.listBlockchain[blockchain].listToken[tokenName].costByToken = (value + walletQuantity * costByToken) / (walletQuantity + quantity);
        wallet.listBlockchain[blockchain].listToken[tokenName].quantity += quantity;
    } else {
        //Gestion des profits realise dans la fonction superieur.
        wallet.listBlockchain[blockchain].listToken[tokenName].costByToken = (walletQuantity * costByToken - value) / (walletQuantity - quantity);
        wallet.listBlockchain[blockchain].listToken[tokenName].quantity += quantity;
    }
    await wallet.save();
    res.status(200).json({"message": "cost by token updated"}); 
}

module.exports = {
    increaseQuantityOfToken,
    decreaseQuantityOfToken,
    getQuantityOfToken,
    increaseRealizedProfit,
    getRealizedProfit,
    updateCostByToken
}