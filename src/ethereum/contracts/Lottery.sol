pragma solidity ^0.4.17;

contract LotteryFactory {

    address public manager;
    uint public ticketPrice;
    uint public maxNum;
    address[] public lotteryAddresses;
    Lottery public currentLottery = Lottery(address(0x0));
    RandomNumberOracle public randomNumberGenerator = RandomNumberOracle(address(0x0));

    constructor(uint _ticketPrice, uint _maxNum) public {
        manager = msg.sender;
        ticketPrice = _ticketPrice;
        maxNum = _maxNum;
        createRandomNumberOracle();
        createLottery(ticketPrice, maxNum);
    }

    function createLottery(uint priceToPlay, uint maxNum) private {
        require(randomNumberGenerator != RandomNumberOracle(address(0x0)), "You have to initialize the random number generator first.");
        require(currentLottery == Lottery(address(0x0)), "You have a lottery running");
        currentLottery = new Lottery(priceToPlay, address(this), address(randomNumberGenerator), maxNum);
        lotteryAddresses.push(address(currentLottery));
    }

    function pickWinner() public {
        require(msg.sender == manager, "You are not authorized.");
        address[] memory winners = currentLottery.pickWinner(address(this));
        if (winners.length != 0) {
            uint prize = address(this).balance / winners.length;
            for (uint i = 0; i < winners.length; i++) {
                winners[i].transfer(prize);
            }
        }
        currentLottery = new Lottery(ticketPrice, address(this), address(randomNumberGenerator), maxNum);
        lotteryAddresses.push(address(currentLottery));
        // createLottery(ticketPrice, maxNum);
    }

    function play(uint8 guess) public payable {
        require(currentLottery != Lottery(address(0x0)), "There is no lottery running.");
        require(msg.value >= currentLottery.getTicketPrice(), "You have to send enough money.");

        currentLottery.play(guess, msg.sender);
    }

    function createRandomNumberOracle() private {
        randomNumberGenerator = new RandomNumberOracle();
    }

    function getDeployedLotteries() public view returns (address[]) {
        return lotteryAddresses;
    }
}

contract Lottery {

    address public factory;
    uint public ticketPrice;
    bool public closed = false;
    uint public playerCount = 0;
    uint public maxNum;
    uint public winNumber;

    RandomNumberOracle public randomNumberGenerator = RandomNumberOracle(address(0x0));

    mapping(uint => address[]) playersByNumber;

    constructor(uint _priceToPlay, address _factory, address _randomNumberGenerator, uint _maxNum) public {
        factory = _factory;
        ticketPrice = _priceToPlay;
        maxNum = _maxNum;
        randomNumberGenerator = RandomNumberOracle(_randomNumberGenerator);
    }

    function play(uint8 guess, address player) public {
        require(closed == false, "The lottery is closed.");
        require(guess <= maxNum, "Guess guess number not valid.");
        playersByNumber[guess].push(player);
        playerCount++;
    }

    function pickWinner(address caller) public returns (address[]) {
        require(caller == factory, "You are not authorized to call this method.");
        require(closed == false, "The lottery is closed.");
        winNumber = randomNumberGenerator.getRandom(maxNum);
        closed = true;
        return (playersByNumber[winNumber]);
    }

    function getTicketPrice() public view returns (uint) {
        return (ticketPrice);
    }

    function getPlayersByNum(uint num) public view returns (address[]) {
        return playersByNumber[num];
    }

    function describeLottery() public view returns (
        bool, uint, uint, address, uint, address[]
    ) {
        return (
        closed,
        playerCount,
        ticketPrice,
        factory,
        winNumber,
        playersByNumber[winNumber]
        );
    }
}

contract RandomNumberOracle {

    constructor() public {}

    function getRandom(uint range) public view returns (uint) {
        return 1;
    }
}