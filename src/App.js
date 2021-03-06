import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Layout from './containers/Layout';
import FactoryPanel from './components/factoryPanel';
import HistoryPage from './components/HistoryPage';
import {loadFactory} from "./store/actions/factoryActionCreators";
import {connect} from "react-redux";

class App extends Component {

    componentDidMount() {
        this.props.onAppOpen();
    }

    render() {
        return (
            <div className="App">
                <Router>
                    <Layout>
                        <Switch>
                            <Route exact path="/" component={FactoryPanel}/>
                            {/*this is just to make it work on github pages*/}
                            <Route exact path="/bcoln-ct" component={FactoryPanel}/>
                            <Route exact path="/history" component={HistoryPage}/>
                        </Switch>
                    </Layout>
                </Router>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAppOpen: () => dispatch(loadFactory())
    }
};


export default connect(null, mapDispatchToProps)(App);