import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from "react-redux";
import {uiCloseClosedLotteryDialog} from "../store/actions/uiActionCreators";
import classNames from "classnames";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import PropTypes from "prop-types";
import {withStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

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


class ClosedLotteryDialog extends React.Component {

    handleClose = () => {
        this.props.onCloseClosedLotteryDialog();
    };

    render() {
        const {classes} = this.props;
        return (
            <Dialog
                open={this.props.isClosedLotteryDialogOpen}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">You Picked a Winner</DialogTitle>
                {this.props.lottery ?
                    <DialogContent>
                        <DialogContentText>
                            <TextField
                                disabled
                                id="ticket"
                                className={classNames(classes.margin, classes.textField)}
                                variant="outlined"
                                // label="Ticket Price"
                                value={this.props.lottery.playersCount}
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
                                value={this.props.lottery.winNumber}
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
                                value={this.props.lottery.winners.length}
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
                                {this.props.lottery.winners.map((winner, index) => (
                                    <TextField
                                        disabled
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


                        </DialogContentText>

                    </DialogContent>
                    : null}
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ClosedLotteryDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => {
    return {
        onCloseClosedLotteryDialog: () => dispatch(uiCloseClosedLotteryDialog()),
    }
};

const mapStateToProps = state => {
    return {
        isClosedLotteryDialogOpen: state.ui.isClosedLotteryDialogOpen,
        lottery: state.lottery.closedLottery
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ClosedLotteryDialog));