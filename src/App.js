import React, {Component} from 'react';
import AppBar from './components/AppBar';
import FactoryPanel from './components/factoryPanel';
// import LotteriesTable from './components/LotteriesTable'
// import CreateLotteryDialog from "./components/CreateLotteryDialog";
// import PlayLotteryDialog from "./components/PlayLotteryDialog";
import {loadFactory} from "./store/actions/factoryActionCreators";
import {connect} from "react-redux";
import PlayedLotteryDialog from "./components/ClosedLotteryDialog";

class App extends Component {

    componentDidMount() {
        this.props.onAppOpen();
    }

    render() {
        return (
            <div className="App">
                <AppBar/>
                <FactoryPanel/>
                <PlayedLotteryDialog/>
                {/*<LotteriesTable/>*/}
                {/*<CreateLotteryDialog/>*/}
                {/*<PlayLotteryDialog/>*/}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAppOpen: () => dispatch(loadFactory())
    }
};


export default connect(null, mapDispatchToProps)(App);