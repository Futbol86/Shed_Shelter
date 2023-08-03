import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Pagination from 'react-js-pagination';

class AppPagination extends Component{
    constructor(props) {
        super(props);
        this.state = { activePage: 1 };
    }

    componentWillReceiveProps(nextProps) {
        const {pagination} = this.props;
        const {pagination: nextPagination} = nextProps;
        if ((pagination && nextPagination) && (pagination.skip !== nextPagination.skip)) {
            const {skip, limit} = nextPagination;
            this.setState({ activePage: Math.floor(skip / limit) + 1 });
        }
    };

    handlePageChange = (pageNumber) => {
        this.setState({activePage: pageNumber});
        this.props.onChangePage(pageNumber);
    };

    render() {
        const {pagination} = this.props;
        if (!pagination)
            return null;
        const {total, limit} = pagination;
        const totalPages = Math.ceil(total / limit);
        return (
            (totalPages <= 1)? null
                :<Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={limit}
                    totalItemsCount={total}
                    pageRangeDisplayed={10}
                    onChange={this.handlePageChange}
                />

        );
    }
}

AppPagination.propTypes = {
    pagination: PropTypes.object,
    onChangePage: PropTypes.func
};

export default AppPagination;