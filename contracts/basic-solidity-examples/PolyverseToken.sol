// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PolyverseToken is ERC20, ERC20Burnable, Ownable {
    constructor() ERC20("PolyverseToken", "PVT") {
        _mint(address(this), 100000000 * 10 ** decimals());
    }

    function mint(uint256 amount) public payable  {
        uint256 total = amount * 0.09 ether;
        require(msg.value >= total, "use need to pay fee to mint token");
        _mint(msg.sender, amount);
    }

    function getUserBalance(address _holder) external view returns (uint256) {
        return balanceOf(_holder);
    }
}
