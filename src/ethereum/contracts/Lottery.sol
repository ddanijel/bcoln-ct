pragma solidity >=0.4.22 <0.6.0;

contract LotteryFactory {
    Lottery[] public deployedLotteries;

    function createLottery(uint priceToPlay) public {
        Lottery newLottery = new Lottery(priceToPlay, msg.sender);
        deployedLotteries.push(newLottery);
    }

    function getDeployedLotteries() public view returns (Lottery[] memory) {
        return deployedLotteries;
    }

}

contract Lottery {

    address public owner;
    uint public price;
    uint playersCount = 0;

    struct Player {
        address playerAddress;
        uint guess;
    }

    Player[] public players;

    constructor(uint priceToPlay, address manager) public {
        owner = manager;
        price = priceToPlay;
    }

    function play(uint guess) public payable {
        require(msg.value > price);
        require(guess > 0 && guess < 10);

        Player memory newPlayer = Player({
            playerAddress : msg.sender,
            guess : guess
            });
        playersCount++;
        players.push(newPlayer);
    }

}
