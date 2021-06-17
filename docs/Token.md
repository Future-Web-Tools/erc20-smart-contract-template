## `Token`



Just another ERC20 token

### `onlyAdmin()`

only admin modifier




### `constructor()` (public)



Grants `DEFAULT_ADMIN_ROLE` to address that created contract

### `pause()` (public)



Pauses all token transfers.

### `unpause()` (public)



Unpauses all token transfers

### `addAdmin(address _admin)` (public)



adds a new admin

### `removeAdmin(address _admin)` (public)



removes an admin

### `renounceAdmin()` (public)



removes an admin

### `adminCount() → uint256` (public)



get admin count

### `isAdmin(address _admin) → bool` (public)



checks if is an admin

### `getAdmin(uint256 _admin) → address` (public)



returns admin at index

### `_beforeTokenTransfer(address from, address to, uint256 amount)` (internal)






