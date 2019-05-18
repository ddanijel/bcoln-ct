import React from 'react';
import classNames from "classnames";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Lottery from '../ethereum/lottery';
import web3 from "../ethereum/web3";

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


class LotteryHistoryDetails extends React.Component {
    _isMounted = false;
    state = {
        lotteryDetails: null
    };

    async componentDidMount() {
        this._isMounted = true;
        const lottery = await Lottery(this.props.address).methods.describeLottery().call();
        const lotteryDetails = {
            address: this.props.address,
            closed: lottery[0],
            playersCount: web3.utils.hexToNumber(lottery[1]),
            ticketPrice: web3.utils.fromWei(String(lottery[2]), 'ether'),
            owner: lottery[3],
            winNumber: web3.utils.hexToNumber(lottery[4]),
            winners: lottery[5]
        };

        if (this._isMounted) {
            this.setState({
                ...this.state,
                lotteryDetails
            })
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {classes} = this.props;
        const {lotteryDetails} = this.state;
        return (
            <div>
                {this._isMounted === true && lotteryDetails !== null ?
                    <div>
                        <TextField
                            disabled
                            id="ticket"
                            className={classNames(classes.margin, classes.textField)}
                            variant="outlined"
                            // label="Ticket Price"
                            value={lotteryDetails.playersCount}
                            fullWidth
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Players Count</InputAdornment>
                            }}
                            style={{width: '90%'}}
                        />

                        <TextField
                            disabled
                            id="ticket"
                            className={classNames(classes.margin, classes.textField)}
                            variant="outlined"
                            // label="Ticket Price"
                            value={lotteryDetails.winNumber}
                            fullWidth
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Winning Number</InputAdornment>
                            }}
                            style={{width: '90%'}}
                        />

                        <TextField
                            disabled
                            id="ticket"
                            className={classNames(classes.margin, classes.textField)}
                            variant="outlined"
                            // label="Ticket Price"
                            value={lotteryDetails.winners.length}
                            fullWidth
                            InputProps={{
                                startAdornment: <InputAdornment position="start">Winners Count</InputAdornment>
                            }}
                            style={{width: '90%'}}
                        />

                        <Paper className={classes.root} elevation={1}>
                            <Typography variant="h5" component="h3">
                                Winners
                            </Typography>
                            {lotteryDetails.winners.map((winner, index) => (
                                <TextField
                                    disabled
                                    key={index}
                                    id="standard-disabled"
                                    label={"Player " + (index + 1)}
                                    defaultValue={winner}
                                    className={classes.textField}
                                    margin="normal"
                                    fullWidth
                                    style={{width: '95%'}}
                                />
                            ))}
                        </Paper>
                    </div>
                    : null}
            </div>
        );
    }
}

LotteryHistoryDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LotteryHistoryDetails);