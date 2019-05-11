import React from "react";
import MaterialTable from "material-table";
import {fetchDeployedLotteries} from "../store/actions/lotteryActionCreators";
import {connect} from "react-redux";

class LotteriesTable extends React.Component {
    componentDidMount() {
        this.props.fetchDeployedLotteries();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log('next: ', nextProps.deployedLotteries);
        return this.props.deployedLotteries.length !== nextProps.deployedLotteries.length;
    }

    render() {
        return (
            <MaterialTable
                title="Active Lotteries"
                columns={[
                    {title: 'Ticket Price', field: 'ticketPrice'},
                    {title: 'Number of Players', field: 'numberOfPlayers'},
                    {title: 'Address', field: 'address'}
                ]}
                data={
                    this.props.deployedLotteries.forEach(lottery => {
                        console.log('inside lottery: ', lottery);
                        return {
                            ticketPrice: lottery.ticketPrice,
                            numberOfPlayers: lottery.playersCount,
                            address: lottery.address
                        }
                    })}
                actions={[
                    {
                        icon: 'play_arrow',
                        tooltip: 'Play',
                        onClick: (event, rowData) => alert("You play " + rowData.address)
                    }
                ]}
            />
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(LotteriesTable);