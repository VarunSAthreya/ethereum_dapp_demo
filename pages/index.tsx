import { ethers } from 'ethers';
import { NextPage } from 'next';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json';
import Token from '../artifacts/contracts/Token.sol/Token.json';

declare global {
    interface Window {
        ethereum: any;
    }
}

const greeterAddress = process.env.NEXT_PUBLIC_GREETER;
const tokenAddress = process.env.NEXT_PUBLIC_TOKEN;

const HomePage: NextPage = () => {
    const [greeting, setGreetingValue] = useState('');
    const [userAccount, setUserAccount] = useState('');
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState(-1);

    const requestAccount = async () => {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    };

    const getBalance = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const [account] = await window.ethereum.request({
                method: 'eth_requestAccounts',
            });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(
                tokenAddress,
                Token.abi,
                provider
            );
            const balance = await contract.balanceOf(account);
            console.log('Balance: ', balance.toString());
            setBalance(balance);
        }
    };

    const fetchGreeting = async () => {
        if (typeof window.ethereum !== 'undefined') {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract = new ethers.Contract(
                greeterAddress,
                Greeter.abi,
                provider
            );
            try {
                const data = await contract.greet();
                console.log('data: ', data);
                setGreetingValue(data);
            } catch (err) {
                console.log('err: ', err);
            }
        }
    };

    const setGreeting = async () => {
        if (!greeting) return;

        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                greeterAddress,
                Greeter.abi,
                signer
            );
            const transaction = await contract.setGreeting(greeting);
            setGreetingValue('');
            await transaction.wait();
            fetchGreeting();
        }
    };

    const transferCoin = async () => {
        if (typeof window.ethereum !== 'undefined') {
            await requestAccount();
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                tokenAddress,
                Token.abi,
                signer
            );
            const transaction = await contract.transfer(userAccount, amount);
            await transaction.wait();
            console.log(`${amount} Coins successfully sent to ${userAccount}`);
            getBalance();
        }
    };

    return (
        <div className="container gap-3 d-grid">
            <h1 className="text-center">Ethereum DAPP Demo</h1>
            <h3>Greeting Contract</h3>
            <Button className="p-2 border" onClick={fetchGreeting}>
                Fetch Greeting
            </Button>
            <Form.Control
                className="p-2 border"
                type="text"
                value={`Current Greeting: ${
                    greeting !== '' ? greeting : 'Fetch Greeting'
                }`}
                disabled
            />
            <Form.Control
                className="p-2 border"
                type="text"
                placeholder="Set Greetings"
                onChange={(e) => setGreetingValue(e.target.value)}
            />
            <Button className="p-2 border" onClick={setGreeting}>
                Set Greeting
            </Button>

            <h3 className="mt-5">Token Contract</h3>
            <Button className="p-2 border" onClick={getBalance}>
                Get Balance
            </Button>
            <Form.Control
                className="p-2 border"
                type="text"
                value={`Current Balance(Example Token): ${
                    balance !== -1 ? balance : 'Get balance'
                }`}
                disabled
            />
            <Form.Control
                className="p-2 border"
                type="text"
                placeholder="Account ID"
                onChange={(e) => setUserAccount(e.target.value)}
                value={userAccount}
            />
            <Form.Control
                className="p-2 border"
                type="text"
                placeholder="Amount"
                onChange={(e) => setAmount(parseInt(e.target.value))}
            />
            <Button className="p-2 border" onClick={transferCoin}>
                Transfer Coins
            </Button>
        </div>
    );
};

export default HomePage;
