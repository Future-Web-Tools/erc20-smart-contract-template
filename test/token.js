
const { expect } = require('chai')
const toWei = ethers.utils.parseEther

describe('Token contract', function () {
  let token, admin1, admin2, holder1, holder2
  const TOTAL_SUPPLY = toWei('100000000')

  before(async () => {
    [admin1, admin2, holder1, holder2] = await ethers.getSigners()

    const Token = await ethers.getContractFactory('Token')
    token = await Token.deploy()
  })

  describe('balances tests', function () {
    it('should have total supply of 100,000,000', async () => {
      expect((await token.totalSupply()).toString()).to.equal(TOTAL_SUPPLY)
    })

    it('admin should have total supply', async () => {
      expect((await token.balanceOf(admin1.address)).toString()).to.equal(TOTAL_SUPPLY)
    })
  })

  describe('pausing tests', function () {
    it('admin can pause', async function () {
      await expect(token.connect(admin1).pause())
        .to.emit(token, 'Paused')

      expect(await token.paused()).to.equal(true)
    })

    it('admin can unpause', async function () {
      await expect(token.connect(admin1).unpause()).to.emit(token, 'Unpaused')

      await expect(await token.paused()).to.equal(false)
    })

    it('only admin can pause', async function () {
      await expect(token.connect(holder1).pause()).to.be.revertedWith('Not authorized')
    })

    it('only admin can unpause', async function () {
      await token.connect(admin1).pause()
      await expect(await token.paused()).to.equal(true)

      await expect(token.connect(holder1).unpause()).to.be.revertedWith('Not authorized')
      await expect(await token.paused()).to.equal(true)

      await expect(token.connect(admin1).unpause()).to.emit(token, 'Unpaused')
      await expect(await token.paused()).to.equal(false)
    })

    it('admin can add other admin', async function () {
      const initialAdminCount = (await token.adminCount()).toNumber()

      await token.connect(admin1).addAdmin(admin2.address)
      await expect(await token.isAdmin(admin2.address)).to.equal(true)

      await expect((await token.adminCount()).toNumber()).to.equal(initialAdminCount + 1)
    })

    it('admin can remove other admin', async function () {
      const initialAdminCount = (await token.adminCount()).toNumber()

      await token.connect(admin1).removeAdmin(admin2.address)
      await expect(await token.isAdmin(admin2.address)).to.equal(false)

      await expect((await token.adminCount()).toNumber()).to.equal(initialAdminCount - 1)
    })

    it('only admin can add other admin', async function () {
      const initialAdminCount = (await token.adminCount()).toNumber()

      await expect(token.connect(holder1).addAdmin(holder2.address)).to.be.revertedWith('Not authorized')
      await expect((await token.adminCount()).toNumber()).to.equal(initialAdminCount)
    })

    it('only admin can remove other admin', async function () {
      await token.connect(admin1).addAdmin(admin2.address)
      await expect(await token.isAdmin(admin2.address)).to.equal(true)

      await expect(token.connect(holder1).removeAdmin(admin2.address)).to.be.revertedWith('Not authorized')
      await expect(await token.isAdmin(admin2.address)).to.equal(true)
    })

    it('admin can renounce', async function () {
      await token.connect(admin2).renounceAdmin()
      await expect(await token.isAdmin(admin2.address)).to.equal(false)
    })

    it('cannot remove last admin', async function () {
      await expect(await token.isAdmin(admin1.address)).to.equal(true)

      await expect(token.connect(admin1).removeAdmin(admin1.address)).to.be.revertedWith('Cannot remove last admin')
      await expect(token.connect(admin1).renounceAdmin()).to.be.revertedWith('Cannot remove last admin')

      await expect(await token.isAdmin(admin1.address)).to.equal(true)
    })

    it('transfers happen when not paused', async function () {
      const amountToTransfer = 1000
      const initialHolderBalance = (await token.balanceOf(holder1.address)).toNumber()
      await token.connect(admin1).transfer(holder1.address, amountToTransfer)

      const expectedTotalHolderBalance = initialHolderBalance + amountToTransfer
      const currentBalance = (await token.balanceOf(holder1.address)).toNumber()

      expect(currentBalance).to.be.equal(expectedTotalHolderBalance)
    })

    it('no transfers when paused', async function () {
      await token.connect(admin1).pause()
      await expect(token.connect(admin1).transfer(holder1.address, 100))
        .to.be.revertedWith('ERC20Pausable: token transfer while paused')
    })

    it('transfers work after unpausing', async function () {
      await token.connect(admin1).unpause()

      const amountToTransfer = 1000
      const initialHolderBalance = (await token.balanceOf(holder1.address)).toNumber()

      await token.connect(admin1).transfer(holder1.address, amountToTransfer)

      const expectedTotalHolderBalance = initialHolderBalance + amountToTransfer
      const currentBalance = (await token.balanceOf(holder1.address)).toNumber()

      expect(currentBalance).to.be.equal(expectedTotalHolderBalance)
    })
  })

  describe('burn tests', function () {
    it('holders can burn', async function () {
      const amountToTransfer = 1000
      const amountToBurn = 500
      const initialHolderBalance = (await token.balanceOf(holder1.address)).toNumber()

      await token.transfer(holder1.address, amountToTransfer)
      await token.connect(holder1).burn(amountToBurn)

      const expectedTotalHolderBalance = initialHolderBalance + amountToTransfer - amountToBurn
      const currentBalance = (await token.balanceOf(holder1.address)).toNumber()

      expect(currentBalance).to.be.equal(expectedTotalHolderBalance)
    })
  })
})
