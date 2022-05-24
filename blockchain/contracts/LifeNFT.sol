//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;
import "erc721a/contracts/ERC721A.sol"; 
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";


contract LifeNFT is ERC721A, Ownable {
  string private baseURI =  "ipfs://bafybeibiqowptk2y2hbocgwndlczwzyrdrjskjprcqhtkx6qumok5zjopu/";
  uint256 public constant MINT_PRICE = .0001 ether;
  uint256 public constant MAX_SUPPLY = 216;
  bytes32 public root;
  constructor(bytes32 _root) ERC721A("Life NFT", "LifeNFT") {
    root = _root;
  }

  function mint(uint256 quantity, bytes32[] memory proof) external payable {
    require(totalSupply() + quantity <= MAX_SUPPLY, "Not enough tokens left");
    require(msg.value >= getPrice(quantity), "Not enough ether sent");

    bytes32 leaf = keccak256(abi.encodePacked(msg.sender));
    require(isValid(proof, leaf), "Not a part of the whitelist");
    _safeMint(msg.sender, quantity);
  }

  function withdraw() external payable onlyOwner {
    payable(owner()).transfer(address(this).balance);
  }

  function _baseURI() internal view override returns (string memory) {
    return baseURI;
  }
  //set base uri
  function isValid(bytes32[] memory proof, bytes32 leaf) public view returns(bool) {
    return MerkleProof.verify(proof, root, leaf);
  }

  function getPrice(uint256 quantity) public pure returns (uint256) {
    return MINT_PRICE * quantity;
  }
}