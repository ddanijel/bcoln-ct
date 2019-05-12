pragma solidity >=0.4.22 <0.6.0;

contract LotteryFactory {

    address[] public lotteryAddresses;
    mapping(address => Lottery) lotteryMapping;

    function createLottery(uint priceToPlay) public {
        Lottery newLottery = new Lottery(priceToPlay, address(uint160(address(this))), msg.sender);
        lotteryAddresses.push(address(newLottery));
        lotteryMapping[address(newLottery)] = newLottery;
    }

    function getDeployedLotteries() public view returns (address[] memory) {
        return lotteryAddresses;
    }
}

contract Lottery {

    address public owner;
    address payable public factory;
    uint public ticketPrice;
    bool closed = false;
    uint playerCount = 0;

    mapping(uint8 => address payable[]) playersByNumber;

    constructor(uint priceToPlay, address payable _factory, address _owner) public {
        owner = _owner;
        factory = _factory;
        ticketPrice = priceToPlay;
    }

    function play(uint8 guess) public payable {
        require(closed == false);
        require(msg.value > ticketPrice);
        require(guess > 0 && guess < 10);

        playersByNumber[guess].push(msg.sender);
        playerCount++;
    }

    function pickWinner() public {
        // require(msg.sender == owner);
        // require(closed == false);
        // TODO get random number
        uint8 rndNr = 4;

        uint256 winnerCount = playersByNumber[rndNr].length;


        if (winnerCount == 0) {
            factory.transfer(address(this).balance);
        } else {
            uint prize = address(this).balance / playersByNumber[rndNr].length;
            for (uint i = 0; i < playersByNumber[rndNr].length; i++) {
                playersByNumber[rndNr][i].transfer(prize);
            }
        }
        closed = true;
    }

    function describeLottery() public view returns (
        uint, uint, address, address
    ) {
        return (
        playerCount,
        ticketPrice,
        owner,
        factory
        );
    }

}
