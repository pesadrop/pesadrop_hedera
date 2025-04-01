require('dotenv').config();
const {
    AccountId,
    PrivateKey,
    Client,
    ContractExecuteTransaction,
    ContractCallQuery,
    ContractFunctionParameters
} = require("@hashgraph/sdk");
const BigNumber = require('bignumber.js');

// Replace with your deployed contract ID
const contractId = "0.0.5805197"; // Replace with your actual contract ID

async function main() {
    const MY_ACCOUNT_ID = AccountId.fromString(process.env.MY_ACCOUNT_ID);
    const MY_PRIVATE_KEY = PrivateKey.fromString(process.env.MY_PRIVATE_KEY);

    const client = Client.forTestnet()
        .setOperator(MY_ACCOUNT_ID, MY_PRIVATE_KEY);

    try {
        // Call deposit function (deposit 100 HBAR = 100 * 10^8 tinybars)
        const depositAmount = new BigNumber(100 * 10 ** 8); // 100 HBAR in tinybars
        await depositFunds(client, depositAmount);

        // Call withdraw function (if balance is available)
        await withdrawFunds(client);

        // Call deployPool function (Only owner can deploy)
        await deployPool(client);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        client.close();
    }
}

async function depositFunds(client, amount) {
    const depositParams = new ContractFunctionParameters()
        .addUint256(amount);

    const depositTransaction = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(100000)
        .setFunction("deposit", depositParams)
        .setMaxTransactionFee(new BigNumber(1e8)) // Set appropriate fee limit
        .execute(client);

    const receipt = await depositTransaction.getReceipt(client);
    console.log("Deposit Transaction Status:", receipt.status.toString());
}

async function withdrawFunds(client) {
    const withdrawParams = new ContractFunctionParameters();

    const withdrawTransaction = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(100000)
        .setFunction("withdraw", withdrawParams)
        .setMaxTransactionFee(new BigNumber(1e8)) // Set appropriate fee limit
        .execute(client);

    const receipt = await withdrawTransaction.getReceipt(client);
    console.log("Withdraw Transaction Status:", receipt.status.toString());
}

async function deployPool(client) {
    const deployParams = new ContractFunctionParameters();

    const deployTransaction = await new ContractCallQuery()
        .setContractId(contractId)
        .setGas(100000)
        .setFunction("deployPool", deployParams)
        .execute(client);

    console.log("Pool Deploy Status:", deployTransaction.status.toString());
}

main();
