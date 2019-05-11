import React, {Component} from 'react';
import AppBar from './components/AppBar';
import loadLotteryFactory from './util/loadLotteryFactory';
import CreateLotteryDialog from "./components/CreateLotteryDialog";

class App extends Component {
    state = {
        lotteries: []
    };

    componentDidMount() {
        this.loadLotteryFactory();
    }

    loadLotteryFactory = async () => {
        console.log('fetching lotteries');
        const lotteries = await loadLotteryFactory();
        console.log('lotteries: ', lotteries);
        this.setState({
            lotteries
        })
    };





    render() {


        return (
            <div className="App">
                <AppBar/>

                {this.state.lotteries.toString()}

                <CreateLotteryDialog/>
            </div>
        );
    }
}

export default App;
