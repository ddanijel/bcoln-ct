import React, {Component} from 'react';
import AppBar from './components/AppBar';
import lotteryFactory from './ethereum/loteryFactory';

class App extends Component {

    loadLotteryFactory = async () => {
        console.log('fetching lotteries')
        const lotteries = await lotteryFactory.methods.getDeployedLotteries().call();
        console.log('lotteries: ', lotteries)
        return {lotteries};
    };


    render() {

        const lotteries = this.loadLotteryFactory();

        return (
            <div className="App">
                <AppBar/>

                {lotteries.toString()}

            </div>
        );
    }
}

export default App;
