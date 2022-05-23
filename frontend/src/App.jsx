import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import MerkleTree from "merkletreejs";
import keccak256 from "keccak256";
import { ethers } from "ethers";

import AppNavBar from "./components/AppNavBar";
import db from "./firebaseConfig";
import "./App.css";

import { address } from "./address";
import LifeNFT from "./artifacts/contracts/LifeNFT.sol/LifeNFT.json";
import LoadingScreen from "./components/LoadingScreen";

window.Buffer = window.Buffer || require("buffer").Buffer;

function App() {
  const [merkleTree, setMerkleTree] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mintQuantity, setMintQuantity] = useState("");
  const [activeTransaction, setActiveTransaction] = useState(false);

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(address, LifeNFT.abi, provider.getSigner());

  const buf2hex = (item) => "0x" + item.toString("hex");

  async function requestAccount() {
    await window.ethereum.request({
      method: "eth_requestAccounts",
    });
  }

  const fetchData = async () => {
    await requestAccount();
    let addresses = [];
    const querySnapshot = await getDocs(collection(db, "whitelist"));
    querySnapshot.forEach((doc) => {
      addresses.push(doc.data().address);
    });

    const leaves = addresses.map((x) => keccak256(x));
    const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
    setLoading(false);
    return tree;
  };

  useEffect(() => {
    fetchData()
      .then((tree) => setMerkleTree(tree))
      .catch((e) => console.log(e));
  }, []);

  const mint = async (quantity) => {
    if (quantity) {
      const myAddress = await provider.getSigner().getAddress();

      const leaf = keccak256(myAddress);
      const proof = merkleTree.getProof(leaf).map((x) => buf2hex(x.data));

      const price = await contract.getPrice(quantity);
      const data = await contract.mint(quantity, proof, { value: price });
      setActiveTransaction(true);
      try {
        provider.once(data.hash, (transaction) => {
          setActiveTransaction(false);
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (loading) return <LoadingScreen />;
  return (
    <>
      <AppNavBar />
      <div className="menuContainer">
        <div className="menu">
          <div id="mintContainer">
            <input
              id="quantity"
              type="number"
              value={mintQuantity}
              onChange={(event) => setMintQuantity(parseInt(event.target.value))}
            />
            {activeTransaction ? (
              <Button disabled>Waiting...</Button>
            ) : (
              <Button onClick={() => mint(mintQuantity)}>Mint</Button>
            )}
          </div>
          <Button disabled>Play Game (Soon)</Button>
        </div>
      </div>
    </>
  );
}

export default App;
