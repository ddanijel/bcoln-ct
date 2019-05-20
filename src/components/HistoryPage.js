import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from "@material-ui/core/Paper";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import LotteryHistoryDetails from "./LotteryHistoryDetails";
import InputBase from "@material-ui/core/InputBase";

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * 2,
        width: '100%',
    },
    paperRoot: {
        margin: 10,
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    }
});

class HistoryPage extends React.Component {
    state = {
        expanded: null,
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const {classes, allLotteries} = this.props;
        const {expanded} = this.state;

        return (
            <Paper className={classes.paperRoot} elevation={1}>
                <Typography variant="h5" component="h3">
                    Lottery History
                </Typography>
                <div className={classes.root}>

                    {allLotteries.map((address, index) => {
                        return <ExpansionPanel key={index} expanded={expanded === address}
                                               onChange={this.handleChange(address)}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography className={classes.secondaryHeading}>Address: &nbsp;</Typography>
                                <InputBase style={{width: '90%'}} disabled className={classes.margin}
                                           defaultValue={address}/>
                                {/*<Typography className={classes.heading}>{address}</Typography>*/}
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <LotteryHistoryDetails address={address}/>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    })}
                </div>
            </Paper>
        );
    }
}

HistoryPage.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
    return {
        isLoading: state.ui.isLoading,
        allLotteries: state.factory.allLotteries
    };
};

export default withRouter(connect(mapStateToProps, null)(withStyles(styles)(HistoryPage)));