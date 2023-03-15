// SPDX-License-Identifier: MIT
// compiler version must be greater than or equal to 0.8.17 and less than 0.9.0
pragma solidity ^0.8.17;

contract HelloWorld {
    address public owner;
    string public greet = "Hello World!";

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "You are not the owner of contract");
        _;
    }

    function testRequire(uint age) public pure {
        // Require should be used to validate conditions such as:
        // - inputs
        // - conditions before execution
        // - return values from calls to other functions
        require(age > 21, "Age should be grater than 21");
    }

    function testRevert(uint age) public pure {
        // Revert is useful when the condition to check is complex.
        // This code does the exact same thing as the example above
        if (age <= 0) {
            revert("Age cannot be less than 0");
        }
    }

    uint public num;

    function testAssert() public view {
        // Assert should only be used to test for internal errors,
        // and to check invariants.

        // Here we assert that num is always equal to 0
        // since it is impossible to update the value of num
        assert(num == 0);
    }
}
