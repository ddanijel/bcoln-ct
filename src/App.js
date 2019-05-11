import React, {Component} from 'react';
import AppBar from './components/AppBar';
import LotteriesTable from './components/LotteriesTable'
import CreateLotteryDialog from "./components/CreateLotteryDialog";

class App extends Component {
    render() {
        return (
            <div className="App">
                <AppBar/>
                <LotteriesTable/>
                <CreateLotteryDialog/>
            </div>
        );
    }
}

export default App;
