import React from 'react';
import {withRouter} from "react-router-dom";

import Aux from './Aux';
import AppBar from '../components/layout/AppBar';
import Footer from '../components/layout/Footer';


const Layout = (props) => {

    let style = {minHeight: 'calc(100vh - 110px)'};
    switch (props.location.pathname) {
        case '/':
            style = {minHeight: 'calc(100vh - 95px)'};
            break
    }

    return (
        <Aux>
            <div style={style}>
                <AppBar/>
                {props.children}
            </div>
            <Footer/>
        </Aux>
    );
};

export default withRouter(Layout);
