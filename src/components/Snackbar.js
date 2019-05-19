import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import {connect} from "react-redux";
import {uiCloseSnackbar} from "../store/actions/uiActionCreators";

const styles = theme => ({
    close: {
        padding: theme.spacing.unit / 2,
    },
});

class MainSnackbar extends React.Component {

    handleClose = () => {
        this.props.onCloseSnackbar();
    };

    render() {
        const {classes} = this.props;
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={this.props.snackbar.isOpen}
                autoHideDuration={15000}
                onClose={this.handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{this.props.snackbar.message}</span>}
                action={[
                    <a href={this.props.snackbar.button.link} target="_blank">
                        <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
                            {this.props.snackbar.button.text}
                        </Button>
                    </a>,
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={this.handleClose}
                    >
                        <CloseIcon/>
                    </IconButton>,
                ]}
            />
        );
    }
}

MainSnackbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        snackbar: state.ui.snackbar
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onCloseSnackbar: () => dispatch(uiCloseSnackbar())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MainSnackbar));