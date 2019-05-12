pragma solidity >=0.4.22 <0.6.0;

contract LotteryFactory {
    Lottery[] public deployedLotteries;
    
    function createLottery(uint priceToPlay, uint minGuess, uint maxGuess) public {
        require(maxGuess > minGuess);
        Lottery newLottery = new Lottery(priceToPlay, minGuess, maxGuess, address(this), msg.sender);
        deployedLotteries.push(newLottery);
    }

    function getDeployedLotteries() public view returns (Lottery[] memory) {
        return deployedLotteries;
    }

}

contract Lottery {

    address public owner;
    address payable public factory;
    uint public ticketPrice;
    uint playersCount = 0;
    uint minGuess;
    uint maxGuess;
    bool played = false;

    struct Player {
        address payable playerAddress;
        uint guess;
    }

    Player[] public players;
    Player[] public winners;

    constructor(uint priceToPlay, uint _minGuess, uint _maxGuess, address _factory, address _owner) public {
        owner = _owner;
        factory = address(uint160(_factory));
        ticketPrice = priceToPlay;
        minGuess = _minGuess;
        maxGuess = _maxGuess;
    }

    function play(uint guess) public payable {
        require(msg.value == ticketPrice);
        require(guess >= minGuess && guess <= maxGuess);

        Player memory newPlayer = Player({
            playerAddress : msg.sender,
            guess : guess
            });
        playersCount++;
        players.push(newPlayer);
    }
    
    function pickWinner() public {
        require(msg.sender == owner);
        // TODO get random number
        uint rndNr = 4;
        
        for (uint i=0; i < players.length; i++) {
            if (players[i].guess == rndNr) {
                winners.push(players[i]);
            }
        }
        
        factory.transfer(address(this).balance);
        if (winners.length >= 1) {
            uint prizePerWinner = address(this).balance/winners.length; // prize  in Wei
            for (uint i=0; i < winners.length; i++) {
                winners[i].playerAddress.transfer(prizePerWinner);
            }
        } else {
            factory.transfer(address(this).balance);
        }
        played = true;
    }

    function describeLottery() public view returns (
        uint, uint, uint, uint, address
    ) {
        return (
        playersCount,
        ticketPrice,
        minGuess,
        maxGuess,
        owner
        );
    }

}
