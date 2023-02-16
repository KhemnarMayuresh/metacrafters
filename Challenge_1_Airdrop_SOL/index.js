// Import Solana web3 functionalities
const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js")
// Create a new keypair
// const keypair = new Keypair();

// to get cli input address
const address=process.argv[2];
// console.log(address);

// Exact the public and private key from the keypair
// const publicKey = new PublicKey(keypair._keypair.publicKey).toString();
// const privateKey = keypair._keypair.secretKey;

// Connect to the Devnet
// const connection = new Connection(clusterApiUrl("devnet"),"confirmed");

// console.log("public key is ", publicKey);
// console.log("connection object is ", connection);

const getWalletBalance = async() =>{
    try{
        const connection = new Connection(clusterApiUrl("devnet"),"confirmed");
        // console.log("connecion object is ",connection);

        // const myWallet = await Keypair.fromSecretKey(privateKey);
        const walletBalance = await connection.getBalance(new PublicKey(address));
        console.log(`wallet balance: ${parseInt(walletBalance)/ LAMPORTS_PER_SOL } SOL`);
        
    } catch(e){
        console.log(e);
    }
}

const airdropSol = async()=>{
    try{
        const connecion = new Connection(clusterApiUrl("devnet"),"confirmed");
        // const myWallet = await Keypair.fromSecretKey(privateKey);

        console.log("Airdropping some sol to my wallet!");
        const fromAirdropSignature = await connecion.requestAirdrop(
            new PublicKey(address),
            2*LAMPORTS_PER_SOL
            );
        await connecion.confirmTransaction(fromAirdropSignature);

    } catch(e){
        console.log(e);
    }
}

const mainFunction= async ()=>{
    await getWalletBalance();
    await airdropSol();
    await getWalletBalance();
}

mainFunction();