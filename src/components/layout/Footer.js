import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from "react-router-dom";

import Typography from '@material-ui/core/Typography';
import Snackbar from "../Snackbar";

const styles = theme => ({
    footer: {
        backgroundColor: "black",
        // marginTop: theme.spacing.unit,
        padding: `${theme.spacing.unit * 2}px 0`,
    },
});


const footer = (props) => {
    const {classes} = props;

    return (
        <footer className={classes.footer}>
            <Typography style={{fontSize: '1.2rem', color: "white"}} variant="title" align="center" gutterBottom>
                Something about the lottery
            </Typography>
            <Typography style={{color: "white"}} variant="subheading" align="center" color="textSecondary"
                        component="p">
                Contact us...
            </Typography>
            <Snackbar/>
        </footer>
    );
};


export default withRouter(withStyles(styles)(footer));
