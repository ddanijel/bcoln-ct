import React, {Component} from 'react';
import AppBar from './components/AppBar';
import CreateLotteryDialog from "./components/CreateLotteryDialog";
import {connect} from "react-redux";
import {fetchDeployedLotteries} from "./store/actions/lotteryActionCreators";


class App extends Component {

    componentDidMount() {
        this.props.fetchDeployedLotteries();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.deployedLotteries.length !== nextProps.deployedLotteries.length;
    }

    render() {


        return (
            <div className="App">
                <AppBar/>

                {this.props.deployedLotteries.length}

                <CreateLotteryDialog/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        deployedLotteries: state.lottery.deployedLotteries
    };
};


const mapDispatchToProps = dispatch => {
    return {
        fetchDeployedLotteries: () => dispatch(fetchDeployedLotteries())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
