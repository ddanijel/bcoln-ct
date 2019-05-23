import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles/index';
import AppBar from '@material-ui/core/AppBar/index';
import Toolbar from '@material-ui/core/Toolbar/index';
import Typography from '@material-ui/core/Typography/index';
import IconButton from '@material-ui/core/IconButton/index';
import MenuIcon from '@material-ui/icons/Menu';
import {connect} from "react-redux";
import ProgressBar from "../ProgressBar";


const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    appBar: {
        backgroundColor: 'black',
    }
};

function ButtonAppBar(props) {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <AppBar position="static" style={styles.appBar}>
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        <Link to="/bcoln-ct" style={{color: "inherit", textDecoration: "none"}}>Blockchain
                            Lottery</Link>
                    </Typography>
                    <Link to="/history" style={{color: "inherit", textDecoration: "none"}}>History</Link>
                </Toolbar>
            </AppBar>
            {props.isLoading ? <ProgressBar/> : null}
        </div>
    );
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading
    };
};

export default withRouter(connect(mapStateToProps, null)(withStyles(styles)(ButtonAppBar)));
