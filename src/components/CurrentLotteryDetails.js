import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from "classnames";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import web3 from '../ethereum/web3';
import LotteryFactory from '../ethereum/lotteryFactory';
import {connect} from "react-redux";

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    root: {
        margin: 10,
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        marginTop: theme.spacing.unit,
        width: 200,
    },
});


class CurrentLotteryDetails extends Component {
    state = {
        guessNumber: -1,
        selectGuessNumberError: false,
        totalPrize: ''
    };

    componentDidMount() {
        web3.eth.getBalance(LotteryFactory.address)
            .then(balance => {
                this.setState({totalPrize: String(balance)})
            });
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.factory !== undefined) {
            if (this.props.factory.currentLottery === null && nextProps.factory.currentLottery !== null) {
                this.props.loadActiveLottery(nextProps.factory.currentLottery);
            }
        }
        if (this.props.factory.confirmationNumber !== nextProps.factory.confirmationNumber) {
            web3.eth.getBalance(LotteryFactory.address)
                .then(balance => {
                    this.setState({totalPrize: String(balance)})
                });
        }
    }

    render() {
        const {classes} = this.props;
        const {address, playersCount} = this.props.lottery;

        return (
            <div style={{width: '100%'}}>
                <TextField
                    disabled
                    id="ticket"
                    className={classNames(classes.margin, classes.textField)}
                    variant="outlined"
                    // label="Ticket Price"
                    value={address}
                    fullWidth
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Address</InputAdornment>
                    }}
                    style={{width: '90%'}}
                />
                <TextField
                    disabled
                    id="ticket"
                    className={classNames(classes.margin, classes.textField)}
                    variant="outlined"
                    // label="Ticket Price"
                    value={playersCount}
                    fullWidth
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Player Count</InputAdornment>
                    }}
                    style={{width: '40%'}}
                />
                <TextField
                    disabled
                    id="ticket"
                    className={classNames(classes.margin, classes.textField)}
                    variant="outlined"
                    // label="Ticket Price"
                    value={web3.utils.fromWei(this.state.totalPrize)}
                    fullWidth
                    InputProps={{
                        startAdornment: <InputAdornment position="start">Total Prize</InputAdornment>,
                        endAdornment: <InputAdornment position="start">ETH</InputAdornment>,
                    }}
                    style={{width: '90%'}}
                />
            </div>
        );
    }
}

CurrentLotteryDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
    return {
        factory: state.factory
    };
};

export default connect(mapStateToProps, null)(withStyles(styles)(CurrentLotteryDetails));