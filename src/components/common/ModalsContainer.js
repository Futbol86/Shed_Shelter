import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {openModalAction, closeModalAction} from '../../actions';
import ModalsComponent from './Modals/ModalsComponent';

const mapStateToProps = (state) => ({
    modals: state.modals.modals
});

const mapDispatchToProps = (dispatch) => bindActionCreators({openModalAction, closeModalAction}, dispatch);

export default connect( mapStateToProps, mapDispatchToProps )(ModalsComponent);