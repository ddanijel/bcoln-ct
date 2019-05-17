import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from "react-redux";
import {uiClosePlayLotteryDialog} from "../store/actions/uiActionCreators";


class PlayLotteryDialog extends React.Component {
    state = {
        guess: ''
    };

    handleClose = () => {
        this.props.onClosePlayLotteryDialog();
        this.setState({...this.state, guess: ''});
    };

    handlePlayLotteryPressed = () => {
        this.props.onPlayLotteryPressed(this.props.activeLottery, this.state.guess);
        this.setState({...this.state, guess: ''});
    };

    handleChange = name => event => {
        this.setState({[name]: event.target.value});
    };

    render() {
        return (
            <Dialog
                open={this.props.isPlayLotteryDialogOpen}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Play Lottery</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To play the lottery, please guess a number between 1 and 9.
                    </DialogContentText>
                    <Input
                        autoFocus
                        margin="dense"
                        id="ticketPrice"
                        label="Ticket Price"
                        type="number"
                        fullWidth
                        value={this.state.guess}
                        onChange={this.handleChange('guess')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handlePlayLotteryPressed} color="primary">
                        Play
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClosePlayLotteryDialog: () => dispatch(uiClosePlayLotteryDialog()),
    }
};

const mapStateToProps = state => {
    return {
        isPlayLotteryDialogOpen: state.ui.isPlayLotteryDialogOpen,
        activeLottery: state.lottery.activeLottery
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayLotteryDialog);