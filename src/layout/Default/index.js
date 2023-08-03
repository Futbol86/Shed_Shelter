import React, {Component} from 'react';
import {Container} from 'reactstrap';
import Header from '../../components/layout/Header';
import Sidebar from '../../components/layout/Sidebar/';
import Breadcrumb from '../../components/layout/Breadcrumb/';
// import Aside from '../../components/common/Aside/';
import Footer from '../../components/layout/Footer/';

class DefaultLayout extends Component {
    render() {
        const {children, ...otherProps} = this.props;
        return (
            <div className="app">
                <Header />
                <div className="app-body">
                    <Sidebar {...otherProps}/>
                    <main className="main">
                        <Breadcrumb />
                        <Container fluid>
                            {children}
                        </Container>
                    </main>
                    {/*<Aside />*/}
                </div>
                <Footer />
            </div>
        );
    }
}

export default DefaultLayout;
