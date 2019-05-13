pragma solidity >= 0.5.0 < 0.6.0;

contract Oracle {

    constructor() public { }
    
    function getRandom(uint range) public view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp, block.difficulty)))%range;
    }
}

// TODO we could also deploy the oracle first and then reference it in the lottery with its contract ID.
// Currently every lottery creates a new oracle contract.
contract Lottery {

    address payable public owner;
    uint public ticketPrice;
    uint public maxGuess;
    uint public prize = 0;
    uint latestWinnerCount = 0;
    uint latestPrizePerWinner = 0;
    uint16 maxGuessCount;
    uint guessCount = 0;
    mapping(uint => address payable[]) playersByGuess;
    uint[] public guesses;
    uint public winNr;
    Oracle public oracle;

    constructor(uint _ticketPrice, uint _maxGuess, uint16 _maxGuessCount) public {
        owner = msg.sender;
        ticketPrice = _ticketPrice;
        maxGuess = _maxGuess;
        maxGuessCount = _maxGuessCount;
        oracle = new Oracle();
    }
    
    function play(uint8 guess) public payable {
        require(msg.value >= ticketPrice);
        require(guessCount < maxGuessCount);
        require(guess <= maxGuess);
      
      
      playersByGuess[guess].push(msg.sender);
      guesses.push(guess);
      guessCount++;
    }
    
    function pickWinner() public {
        require(msg.sender == owner);

        winNr = oracle.getRandom(maxGuess);

        latestWinnerCount = playersByGuess[winNr].length;
        if (latestWinnerCount != 0) {
            latestPrizePerWinner = address(this).balance / playersByGuess[winNr].length;
            for (uint i = 0; i < playersByGuess[winNr].length; i++) {
                playersByGuess[winNr][i].transfer(latestPrizePerWinner);
            }
        }
        for (uint i = 0; i < guesses.length; i++) {
            delete playersByGuess[guesses[i]];
        }
        guessCount = 0;
        delete guesses;
    }

    function describeLottery() public view returns (
        uint, uint, uint, uint, address
    ) {
        return (
        guessCount,
        address(this).balance,
        ticketPrice,
        winNr,
        owner
        );
    }
}
