import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import web3 from './../ethereum/web3';
import MenuItem from "@material-ui/core/MenuItem";
import {playLottery} from "../store/actions/factoryActionCreators";


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
        width: 200,
    },
});


class FactoryPanel extends Component {
    state = {
        guessNumber: -1
    };


    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    handlePlayLotteryPressed = () => {
        const ticketPrice = this.props.factory.ticketPrice;
        const guessNumber = this.state.guessNumber;
        this.props.onPlayLotteryPressed(ticketPrice, guessNumber);
    };


    render() {
        const {classes} = this.props;

        const guessNumbers = [];
        for (let i = 0; i <= this.props.factory.maxGuessNumber; i++) {
            guessNumbers.push({value: i, label: i})
        }

        return (
            <div>
                <Paper className={classes.root} elevation={1}>
                    <Typography variant="h5" component="h3">
                        Play the lottery
                    </Typography>
                    <TextField
                        disabled
                        id="ticket"
                        className={classNames(classes.margin, classes.textField)}
                        variant="outlined"
                        // label="Ticket Price"
                        value={web3.utils.fromWei(String(this.props.factory.ticketPrice), 'ether')}
                        fullWidth
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Ticket Price</InputAdornment>,
                            endAdornment: <InputAdornment position="start">ETH</InputAdornment>,
                        }}
                        style={{width: '250px'}}
                    />

                    <TextField
                        select
                        className={classNames(classes.margin, classes.textField)}
                        variant="outlined"
                        // label="With Select"
                        value={this.state.guessNumber}
                        onChange={this.handleChange('guessNumber')}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">Guess Number</InputAdornment>,
                        }}
                        style={{width: '150px'}}
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
                    <Collapse in={true} timeout="auto" unmountOnExit>
                        <Typography variant="h5" component="h3">
                            Here you can find some details about the lottery...
                        </Typography>
                    </Collapse>
                </Paper>
            </div>
        );
    }
}

FactoryPanel.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        factory: state.factory
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onPlayLotteryPressed: (ticketPrice, guessNumber) => dispatch(playLottery(ticketPrice, guessNumber))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FactoryPanel));