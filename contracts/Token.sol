// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/AccessControlEnumerable.sol";
import "@openzeppelin/contracts/utils/Context.sol";

/**
 * @title Future Web ERC20 token contract template
 * @dev Just another ERC20 token
 */
contract Token is
  Context,
  AccessControlEnumerable,
  ERC20Burnable,
  ERC20Pausable
{
  // solhint-disable-next-line var-name-mixedcase
  uint256 public TOKEN_HARD_CAP_AMOUNT_HERE = 100000000;

  //////////////
  // constructor
  //////////////

  /// @dev Grants `DEFAULT_ADMIN_ROLE` to address that created contract
  // solhint-disable-next-line func-visibility
  constructor() ERC20("TOKEN_NAME_HERE", "TOKEN_SYMBOL_HERE") {
    _setupRole(DEFAULT_ADMIN_ROLE, _msgSender());

    _mint(_msgSender(), TOKEN_HARD_CAP_AMOUNT_HERE * 10**18);
  }

  ////////////
  // modifiers
  ////////////

  /// only admin modifier
  modifier onlyAdmin() {
    require(hasRole(DEFAULT_ADMIN_ROLE, _msgSender()), "Not authorized");
    _;
  }

  //////////////
  // admin calls
  //////////////

  /// @dev Pauses all token transfers.
  function pause() public onlyAdmin {
    _pause();
  }

  /// @dev Unpauses all token transfers
  function unpause() public onlyAdmin {
    _unpause();
  }

  /// @dev adds a new admin
  function addAdmin(address _admin) public onlyAdmin {
    grantRole(DEFAULT_ADMIN_ROLE, _admin);
  }

  /// @dev removes an admin
  function removeAdmin(address _admin) public onlyAdmin {
    require(
      getRoleMemberCount(DEFAULT_ADMIN_ROLE) > 1,
      "Cannot remove last admin"
    );
    revokeRole(DEFAULT_ADMIN_ROLE, _admin);
  }

  /// @dev removes an admin
  function renounceAdmin() public onlyAdmin {
    require(
      getRoleMemberCount(DEFAULT_ADMIN_ROLE) > 1,
      "Cannot remove last admin"
    );
    renounceRole(DEFAULT_ADMIN_ROLE, _msgSender());
  }

  /////////////
  // view calls
  /////////////

  /// @dev get admin count
  function adminCount() public view returns (uint256) {
    return getRoleMemberCount(DEFAULT_ADMIN_ROLE);
  }

  /// @dev checks if is an admin
  function isAdmin(address _admin) public view returns (bool) {
    return hasRole(DEFAULT_ADMIN_ROLE, _admin);
  }

  /// @dev returns admin at index
  function getAdmin(uint256 _admin) public view returns (address) {
    return getRoleMember(DEFAULT_ADMIN_ROLE, _admin);
  }

  /////////////////
  // meta functions
  /////////////////

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 amount
  ) internal virtual override(ERC20, ERC20Pausable) {
    super._beforeTokenTransfer(from, to, amount);
  }
}
