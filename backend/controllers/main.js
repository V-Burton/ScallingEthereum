const Wallet = require("../../models/models");
const { increaseFiatIn, increaseFiatOut } = require("./mainDashboard/fixData");

const { findWalletByAddress } = require("./mainDashboard/processData");
const { increaseQuantityOfToken, updateCostByToken, decreaseQuantityOfToken, increaseRealizedProfit } = require("./tokenDashboard/fixDataToken");

async function update(address){
    const wallet = await findWalletByAddress(address);
    
    for (const blockchain of wallet.listBlockchain) {
        for (const tx of blockchain.listTx) {
            if (tx.date === blockchain.lastDateScan) {
                break;
            }
            if (tx.type === "in") {
                if (tx.track) {
                    increaseFiatIn(wallet, tx.value);
                }
                increaseQuantityOfToken(tx.token, blockchain.name, wallet, tx.quantity);
                updateCostByToken(tx.token, blockchain.name, wallet, tx);
            } else if (tx.type === "out") {
                if (tx.track) {
                    increaseFiatOut(wallet, tx.value);
                }
                decreaseQuantityOfToken(tx.token, blockchain.name, wallet, tx.quantity);
                updateCostByToken(tx.token, blockchain.name, wallet, tx);
                increaseRealizedProfit(tx.token, blockchain.name, wallet, tx.value);
            } else if (tx.type === "swap") {
                //Old token
                decreaseQuantityOfToken(tx.token, blockchain.name, wallet, tx.quantity);
                updateCostByToken(tx.token, blockchain.name, wallet, tx);
                increaseRealizedProfit = tx.quantity * (tx.cotation - wallet.listBlockchain[tx.blockchain].listToken[tx.token].costByToken);               
                
                //New token
                increaseQuantityOfToken(tx.token_received, blockchain.name, wallet, tx.quantity);
                updateCostByToken(tx.token_received, blockchain.name, wallet, tx);
            }
        }
    }
}

async function loadDashboard(address){
    
}

async function loadTokenDashboard(wallet, blockchain, token){}