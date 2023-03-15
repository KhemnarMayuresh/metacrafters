// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title TestStorage
 * @dev set & get value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract TestStorage {

    uint256 number;

    /**
     * @dev set value in variable
     * @param n value to set
     */
    function set(uint256 n) public {
        number = n;
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     */
    function get() public view returns (uint256){
        return number;
    }
}