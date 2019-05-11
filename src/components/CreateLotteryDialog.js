import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {connect} from "react-redux";
import {uiCloseCreateLotteryDialog} from "../store/actions/uiActionCreators";
import {createLottery} from "../store/actions/lotteryActionCreators";


class CreateLotteryDialog extends React.Component {


    handleClose = () => {
        this.props.onCloseCreateLotteryDialog();
    };

    handleCreateLotteryPressed = () => {
        this.props.onCreateLotteryPressed(123);
    };

    render() {
        return (
                <Dialog
                    open={this.props.isCreateLotteryDialogOpen}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">New Lottery</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To create a new lottery, please enter the ticket price.
                        </DialogContentText>
                        <Input
                            autoFocus
                            margin="dense"
                            id="ticketPrice"
                            label="Ticket Price"
                            type="number"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleCreateLotteryPressed} color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCloseCreateLotteryDialog: () => dispatch(uiCloseCreateLotteryDialog()),
        onCreateLotteryPressed: ticketPrice => dispatch(createLottery(ticketPrice))
    }
};

const mapStateToProps = state => {
    return {
        isCreateLotteryDialogOpen: state.ui.isCreateLotteryDialogOpen
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateLotteryDialog);