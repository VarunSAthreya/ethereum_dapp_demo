import { ethers } from 'ethers';
import { NextPage } from 'next';
import { useState } from 'react';
// import Token from './artifacts/contracts/Token.sol/Token.json';
import { Button, Form } from 'react-bootstrap';
import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json';

declare global {
    interface Window {
        ethereum: any;
    }
}

const greeterAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3';

const HomePage: NextPage = () => {
    const [greeting, setGreetingValue] = useState('');

    const requestAccount = async () => {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
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

    return (
        <div className="container">
            <h1>Home Page</h1>
            <Button onClick={fetchGreeting}>Fetch Greeting</Button>
            <Form.Control
                type="text"
                placeholder="Set Greetings"
                onChange={(e) => setGreetingValue(e.target.value)}
                value={greeting}
            />
            <Button onClick={setGreeting}>Set Greeting</Button>
        </div>
    );
};

export default HomePage;
