require("dotenv").config();

const {

AccountId,

PrivateKey,

Client,

AccountCreateTransaction,

Hbar,

TransferTransaction,

AccountBalanceQuery,

AccountAllowanceApproveTransaction

} = require("@hashgraph/sdk");

// Load environment variables

const MY_ACCOUNT_ID = AccountId.fromString(process.env.MY_ACCOUNT_ID);

const MY_PRIVATE_KEY = PrivateKey.fromStringECDSA(process.env.MY_PRIVATE_KEY);

// Set up the Hedera testnet client

const client = Client.forTestnet();

client.setOperator(MY_ACCOUNT_ID, MY_PRIVATE_KEY);

async function createUserAccount(initialBalance) {

const newPrivateKey = PrivateKey.generateECDSA(); 

const newPublicKey = newPrivateKey.publicKey;

const transaction = new AccountCreateTransaction()

.setKey(newPublicKey)

.setInitialBalance(new Hbar(initialBalance));

const txResponse = await transaction.execute(client);

const receipt = await txResponse.getReceipt(client);

const newAccountId = receipt.accountId;

console.log("✅ New Account Created:");

console.log("Account ID:", newAccountId.toString());

console.log("Private Key:", newPrivateKey.toStringRaw()); 

console.log("Public Key:", newPublicKey.toStringRaw());

return { newAccountId, newPrivateKey };

}

async function checkBalance(accountId) {

const balanceQuery = new AccountBalanceQuery().setAccountId(accountId);

const balance = await balanceQuery.execute(client);

console.log(`💰 Balance of ${accountId}: ${balance.hbars.toString()}`);

return balance.hbars.toTinybars();

}

async function transferHbar(senderPrivateKey, senderAccountId, receiverAccountId, amount) {

const transaction = new TransferTransaction()

.addHbarTransfer(senderAccountId, new Hbar(-amount))

.addHbarTransfer(receiverAccountId, new Hbar(amount))

.freezeWith(client); // ✅ Freeze transaction before signing

const signedTx = await transaction.sign(senderPrivateKey);

const txResponse = await signedTx.execute(client);

await txResponse.getReceipt(client);

console.log(`💸 Transferred ${amount} HBAR from ${senderAccountId} to ${receiverAccountId}`);

}

async function approveAllowance(ownerPrivateKey, ownerAccountId, spenderAccountId, amount) {

const transaction = new AccountAllowanceApproveTransaction()

.approveHbarAllowance(ownerAccountId, spenderAccountId, new Hbar(amount))

.freezeWith(client); // ✅ Freeze before signing

const signedTx = await transaction.sign(ownerPrivateKey);

const txResponse = await signedTx.execute(client);

await txResponse.getReceipt(client);

console.log(`🔑 Approved ${amount} HBAR allowance from ${ownerAccountId} to ${spenderAccountId}`);

}

async function main() {

console.log("🚀 Starting Pesadrop...");

// Step 1: Create two users

const user1 = await createUserAccount(10);

const user2 = await createUserAccount(5);

// Step 2: Check their balances

await checkBalance(user1.newAccountId);

await checkBalance(user2.newAccountId);

// Step 3: Transfer Deposit

await transferHbar(user1.newPrivateKey, user1.newAccountId, user2.newAccountId, 0.5);

// Step 4: Check balances again

await checkBalance(user1.newAccountId);

await checkBalance(user2.newAccountId);

// Step 5: Approve allowance for automatic transactions

await approveAllowance(user1.newPrivateKey, user1.newAccountId, user2.newAccountId, 2);

}

main().catch(console.error);