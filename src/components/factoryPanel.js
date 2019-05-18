import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import {pickWinner, playLottery} from "../store/actions/factoryActionCreators";
import {loadActiveLottery} from "../store/actions/lotteryActionCreators";
import LotteryDetails from "./CurrentLotteryDetails";
import PlayedLotteryDialog from './PlayLotteryDialog'
import web3 from '../ethereum/web3'


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


class FactoryPanel extends Component {
    state = {
        guessNumber: -1,
        selectGuessNumberError: false,
        showPickWinnerButton: false
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.props.factory.currentLottery === null && nextProps.factory.currentLottery !== null) {
            this.props.loadActiveLottery(nextProps.factory.currentLottery);
            this.shouldShowPickWinnerButton();
        }
        if (this.props.factory.confirmationNumber !== nextProps.factory.confirmationNumber) {
            this.props.loadActiveLottery(nextProps.factory.currentLottery);
        }
    }

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    handlePlayLotteryPressed = () => {
        const {guessNumber} = this.state;
        const {maxGuessNumber} = this.props.factory;

        if (guessNumber <= maxGuessNumber && guessNumber >= 0) {
            this.setState({selectGuessNumberError: false});
            const ticketPrice = this.props.factory.ticketPrice;
            this.props.onPlayLotteryPressed(ticketPrice, guessNumber);
        } else {
            this.setState({selectGuessNumberError: true});
        }
    };

    shouldShowPickWinnerButton = () => {
        // we show the pick winner button just in case we are the manager of the factory
        web3.eth.getAccounts()
            .then(accounts => {
                this.setState({
                    ...this.state,
                    showPickWinnerButton: this.props.factory.manager === accounts[0]
                })
            })
    };

    handlePickWinnerPressed = () => {
        this.props.pickWinner(this.props.factory.currentLottery);
    };


    render() {
        const {classes} = this.props;

        const guessNumbers = [];
        for (let i = 0; i <= this.props.factory.maxGuessNumber; i++) {
            guessNumbers.push({value: i, label: String("  " + i)})
        }

        return (
            <div>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="h5" component="h3">
                        Play the lottery
                    </Typography>
                    <div style={{width: '100%'}}>
                            <TextField
                                disabled
                                id="ticket"
                                className={classNames(classes.margin, classes.textField)}
                                variant="outlined"
                                // label="Ticket Price"
                                value={this.props.factory.ticketPrice}
                                fullWidth
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Ticket Price</InputAdornment>,
                                    endAdornment: <InputAdornment position="start">ETH</InputAdornment>,
                                }}
                                style={{width: '90%'}}
                            />
                            <TextField
                                select
                                className={classNames(classes.margin, classes.textField)}
                                variant="outlined"
                                // label="With Select"
                                value={this.state.guessNumber}
                                error={this.state.selectGuessNumberError}
                                onChange={this.handleChange('guessNumber')}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">Guess Number</InputAdornment>,
                                }}
                                style={{width: '150px', fontWeight: 'bold'}}
                            >
                                {guessNumbers.map(option => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                        <Button variant="outlined" className={classes.button} onClick={this.handlePlayLotteryPressed}>
                            Play
                        </Button>

                        {
                            this.state.showPickWinnerButton ?
                                <Button variant="outlined" className={classes.button}
                                        onClick={this.handlePickWinnerPressed}>
                                    Pick Winner
                                </Button>
                                : null
                        }

                    </div>
                    <Paper className={classes.root} elevation={1}>
                        <Typography variant="h5" component="h3">
                            Lottery Details
                        </Typography>
                        {this.props.currentLottery ? <LotteryDetails lottery={this.props.currentLottery}/> : null}
                    </Paper>

                </Paper>
                <PlayedLotteryDialog/>
            </div>
        );
    }
}

FactoryPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        factory: state.factory,
        currentLottery: state.lottery.activeLottery
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPlayLotteryPressed: (ticketPrice, guessNumber) => dispatch(playLottery(ticketPrice, guessNumber)),
        loadActiveLottery: address => dispatch(loadActiveLottery(address)),
        pickWinner: lotteryAddress => dispatch(pickWinner(lotteryAddress))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FactoryPanel));