// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract HBARPoolEscrow {
    address public owner;
    uint256 public poolTarget;
    uint256 public totalDeposited;
    mapping(address => uint256) public balances;

    constructor(uint256 _targetInTinybar) {
        owner = msg.sender;
        poolTarget = _targetInTinybar;
    }

    function deposit() external payable {
        require(totalDeposited + msg.value <= poolTarget, "Pool target reached");
        balances[msg.sender] += msg.value;
        totalDeposited += msg.value;
    }

    function withdraw() external {
        require(totalDeposited < poolTarget, "Pool already deployed");
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool sent,) = payable(msg.sender).call{value: amount}("");
        require(sent, "Withdrawal failed");
    }

    function deployPool() external view {
        require(msg.sender == owner, "Unauthorized");
        require(totalDeposited >= poolTarget, "Target not met");
        // Investment logic would go here
    }
}
