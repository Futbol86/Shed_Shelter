import React, {Component} from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import {NavLink} from 'react-router-dom';

class QuickBooksCallbackMessage extends Component {
    render() {
        return (
            <div className='text-center'>
                <Card>
                    <CardBody>
                        <h3 className='text-success'>WELL COME! YOU HAVE GET INTUIT'S AUTHORIZE CODE SUCCESSFULL!!!!!</h3>
                        <NavLink to={`/accountings/quickbooks-apis`} className="btn-secondary mt-4 p-2 text-dark">
                            GO TO LIST APIS
                        </NavLink>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default QuickBooksCallbackMessage;