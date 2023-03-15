import {React, useState, useEffect} from 'react'
import {ethers} from 'ethers'
import styles from './test.module.css'
import simple_token_abi from './Contracts/test_app_abi.json';

const TestApp = () => {

	// deploy simple token contract and paste deployed contract address here. contract is on gorli network chain
	let contractAddress = '0x687dD83635dc6Be08817a81947aDb19aE27F495F';

	const [errorMessage, setErrorMessage] = useState(null);
	const [defaultAccount, setDefaultAccount] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');

	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [contract, setContract] = useState(null);
	const [currentValue, setCurrentValue]= useState("");

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {

			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				setErrorMessage(error.message);
			
			});

		} else {
			console.log('Need to install MetaMask');
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setDefaultAccount(newAccount);
		updateEthers();
	}
	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}

	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);

	window.ethereum.on('chainChanged', chainChangedHandler);

	const updateEthers = () => {
		let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
		setProvider(tempProvider);

		let tempSigner = tempProvider.getSigner();
		setSigner(tempSigner);

		let tempContract = new ethers.Contract(contractAddress, simple_token_abi, tempSigner);
		setContract(tempContract);	
	}

	const getCurrentValue = async()=>{
		let txt= await contract.get();
		let currentValue = txt.toNumber();
		//let tokenDecimals = await contract.decimals();
		console.log(currentValue)
		setCurrentValue(''+currentValue);
	}
	const setNewValue = async(e)=>{
		e.preventDefault();
		let newValue = e.target.newValue.value;
		let txt= await contract.set(newValue);
		alert("Transaction completed");
	}

	return (
	<div >
		<h2> Simple Number store contract </h2>
		<button className={styles.button6} onClick={connectWalletHandler}>{connButtonText}</button>

		<div className={styles.walletCard}>
		<div>
			<h3>Address: {defaultAccount}</h3>
		</div>

		<div>
			<button onClick={getCurrentValue}>Get Current Value</button> <h3>Current Value is: {currentValue} </h3>
		</div>

			{errorMessage}
		</div>
		<div className={styles.interactionsCard}>
			<form onSubmit={setNewValue}>
					<h3> Set New value </h3>
						<p> Enter new Value </p>
						<input type='number' id='newValue' min='0' step='1'/>
						<button type='submit' className={styles.button6}>Update</button>

			</form>
		</div>

	</div>
	)
}

export default TestApp;