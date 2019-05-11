import React from "react";
import MaterialTable from "material-table";
import {fetchDeployedLotteries} from "../store/actions/lotteryActionCreators";
import {connect} from "react-redux";

class LotteriesTable extends React.Component {
    componentDidMount() {
        this.props.fetchDeployedLotteries();
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.props.deployedLotteries.length !== nextProps.deployedLotteries.length;
    }

    render() {
        return (
            <MaterialTable
                searchable="false"
                title="Active Lotteries"
                columns={[
                    {title: 'Ticket Price', field: 'ticketPrice'},
                    {title: 'Number of Players', field: 'numberOfPlayers'},
                    {title: 'Address', field: 'address'},
                    {title: 'Owner', field: 'owner'}
                ]}
                data={
                    this.props.deployedLotteries.map(lottery => {
                        // console.log('inside lottery: ', lottery);
                        return {
                            ticketPrice: lottery.ticketPrice,
                            numberOfPlayers: lottery.playersCount,
                            address: lottery.address,
                            owner: lottery.owner
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