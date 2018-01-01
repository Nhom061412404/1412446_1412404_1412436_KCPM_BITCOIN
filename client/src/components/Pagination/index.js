import React, { Component } from 'react';
import range from 'lodash.range';
import FlatButton from 'material-ui/FlatButton';

import './index.css';

class Pagination extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			pager: {},

		};
	}

	componentDidMount() {
		this.setPage(this.props.initialPage);
	}

	setPage = (page) => {
		let items = this.props.items;
        let pager = this.state.pager;

        if (page < 1 || page > pager.totalPages) {
            return;
        }

        pager = this.getPager(items.length, page);

        let pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);

        this.setState({ pager: pager });

        this.props.onChangePage(pageOfItems);
    }

	getPager = (totalItems, currentPage, pageSize) => {
		currentPage = currentPage || 1;
		pageSize = pageSize || 10;


		let totalPages = Math.ceil(totalItems / pageSize);

		let startPage, endPage;
		
		if(totalPages <= 10) {
			startPage = 1;
			endPage = totalPages;
		} else {
			if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
		}

		let startIndex = (currentPage - 1) * pageSize;
		let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

		console.log('cpage', currentPage);
		console.log('spage', startPage);
		console.log('epage', endPage);

		let pages = range(startPage, endPage + 1);

		return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
	}
	
    render() {
		var pager = this.state.pager;
		
		if (!pager.pages || pager.pages.length <= 1) {
			// don't display pager if there is only 1 page
			return null;
		}

        return (
			<ul className="marika-pagination">
                <li><a className={pager.currentPage === 1 ? 'disabled' : ''} onClick={() => this.setPage(1)}><i className="nav-icon material-icons">skip_previous</i></a></li>

                <li ><a className={pager.currentPage === 1 ? 'disabled' : ''} onClick={() => this.setPage(pager.currentPage - 1)}><i className="nav-icon material-icons">fast_rewind</i></a></li>
                {
					pager.pages.map((page, index) =>
						<li key={index}><a className={pager.currentPage === page ? 'active' : ''} onClick={() => this.setPage(page)}>{page}</a></li>
					)
				}
                <li><a className={pager.currentPage === pager.totalPages ? 'disabled' : ''} onClick={() => this.setPage(pager.currentPage + 1)}><i className="nav-icon material-icons">fast_forward</i></a></li>
                <li><a className={pager.currentPage === pager.totalPages ? 'disabled' : ''} onClick={() => this.setPage(pager.totalPages)}><i className="nav-icon material-icons">skip_next</i></a></li>
            </ul>
        );
    }
}

export default Pagination;