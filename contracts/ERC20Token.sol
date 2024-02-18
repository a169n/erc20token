// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

contract ERC20Token {
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowed;

    string public name = "My ERC20 Token";
    string public symbol = "AIB";
    uint8 public decimals = 0;
    uint256 private _totalSupply;

    address private _owner;

    // Event declarations
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
    event BlockRewardSet(uint256 amount);
    event ContractDestroyed(address recipient);
    event TokensMinted(address indexed _to, uint256 _amount);

    // Constructor to initialize the contract and allocate tokens to the owner's address
    constructor(uint256 initialSupply) {
        _totalSupply = initialSupply;
        _owner = msg.sender;
        _balances[_owner] = _totalSupply;
        emit Transfer(address(0), _owner, _totalSupply);
    }

    modifier onlyOwner() {
        require(msg.sender == _owner, "Only the owner can call this function");
        _;
    }

    // Function to get the total supply of tokens
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    // Function to get the balance of a particular address
    function balanceOf(address account) public view returns (uint256 balance) {
        return _balances[account];
    }


    // Function to get the allowance for a spender on behalf of an owner
    function allowance(address _tokenOwner, address _spender) public view returns (uint256 remaining) {
        return _allowed[_tokenOwner][_spender];
    }


    // Function to transfer tokens from the sender's address to another address
    function transfer(address _to, uint256 _value) public returns (bool success) {
        _beforeTokenTransfer(msg.sender, _to, _value);
        require(_balances[msg.sender] >= _value, "Insufficient balance");
        _balances[msg.sender] -= _value;
        _balances[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    // Function to approve the spender to transfer tokens from the owner's address
    function approve(address _spender, uint256 _value) public returns (bool success) {
        _allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    // Function to transfer tokens from one address to another on behalf of the owner
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        _beforeTokenTransfer(_from, _to, _value);
        require(_value <= _balances[_from], "Insufficient balance");
        require(_value <= _allowed[_from][msg.sender], "Insufficient allowance");
        _balances[_from] -= _value;
        _balances[_to] += _value;
        _allowed[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }

    // Function to set the amount of reward given for mining a block
    function setBlockReward(uint256 amount) public onlyOwner {
        emit BlockRewardSet(amount);
        // Additional logic to set the block reward
    }

    // Function to mint new tokens by creating and assigning the amount of tokens to an account
    function _mint(address account, uint256 amount) internal onlyOwner {
        require(account != address(0), "ERC20: mint to the zero address");

        _totalSupply += amount;
        _balances[account] += amount;
        emit TokensMinted(account, amount);
        emit Transfer(address(0), account, amount);
    }

    // Function to mint tokens as a reward to the miner who mines the latest block
    function _mintMinerReward() internal {
        // Implementation for minting reward to the miner
    }

    // Function called before any transfer of tokens occurs
    function _beforeTokenTransfer(address from, address to, uint256 amount) internal {
        // Additional logic before token transfer
    }

    // Function to destroy the contract and send the remaining tokens to a designated address
    function destroy(address payable recipient) public onlyOwner {
        emit ContractDestroyed(recipient);
        recipient.transfer(address(this).balance); // Transfer remaining ether to recipient
    }

}
