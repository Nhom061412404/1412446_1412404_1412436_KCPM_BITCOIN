import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';

//Redux Component and Function
import { connect } from 'react-redux';
import { itemsFetchData } from '../../../../../../login/actions/items.js';

//Custom Components
import Pagination from 'components/Pagination';
import Filter from 'components/Filter';

//Material UI Component
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn, TableFooter} from 'material-ui/Table';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';

//Material SVG Icon
import FilterListIcon from 'material-ui/svg-icons/content/filter-list';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import OKIcon from 'material-ui/svg-icons/action/done';
import CancelIcon from 'material-ui/svg-icons/content/clear';

//Custom CSS file
import './index.css';

class ListOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pageOfItems: [],
            searchCondition: '',
            showFilter: false,
            hasItemChecked: false,
            openDialog: false,
            orderID: '',
            orderLabel: '',
        }
    }
    
    componentDidMount() {
        let url = "http://5826ed963900d612000138bd.mockapi.io/items";
        this.props.itemsFetchData(url);
    }

    //Change page on panigation
    onChangePage = (pageOfItems) => {
        this.setState({ pageOfItems: pageOfItems });
    }

    handleFilterButtonClick = () => {
        this.setState({ showFilter: !this.state.showFilter });
    }

    handleFilterClick = (url) => {
        console.log('url:', url);
    }
  
    handleDeleteButtonClick = (id, label) => {
        this.setState({ 
            openDialog: true,
            orderID: id,
            orderLabel: label,
        });
    }

    handleDialogClose = () => {
        this.setState({ openDialog: false });
    }

    handleOrderDeleteClick = () => {
        console.log('order ID', this.state.orderID);
        this.setState({ openDialog: false });
    }

    
    render() {
        const actions = [
            <RaisedButton
              label="Cancel"
              primary={true}
              style={{ marginRight: 10 }}
              onClick={this.handleDialogClose}
            />,
            <RaisedButton
              label="Submit"
              secondary
              onClick={this.handleOrderDeleteClick}
            />,
        ];

        return (
            <div className="container-fluid no-breadcrumbs page-dashboard">
                <QueueAnim type="bottom" className="ui-animate">
                    <article className="article">
                        <div className="article-control">
                            <h2 className="article-title">List Order</h2>
                            <div className="order-action">
                                <RaisedButton
                                    label="Filter"
                                    style={{ marginRight: 10, marginBottom: 10 }}
                                    labelPosition="after"
                                    icon={<FilterListIcon />}
                                    primary
                                    onClick={this.handleFilterButtonClick}
                                />
                            </div>
                        </div> 
                        

                        {
                            this.state.showFilter ? (<Filter onCancelClick={this.handleFilterButtonClick} onSearchClick={this.handleFilterClick} />) : (<div></div>)
                        }

                        <Table fixedHeader={true}>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>ID</TableHeaderColumn>
                                    <TableHeaderColumn>Label</TableHeaderColumn>
                                    <TableHeaderColumn style={{width: "8%"}}>Delete</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {
                                    this.state.pageOfItems.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableRowColumn>{item.id}</TableRowColumn>
                                            <TableRowColumn>{item.label}</TableRowColumn>
                                            <TableRowColumn style={{width: "8%"}}>           
                                                <RaisedButton
                                                    backgroundColor="#D50000"
                                                    labelColor="#ffffff"
                                                    style={{ marginBottom: 5, marginTop: 5 }}
                                                    icon={<DeleteIcon />}
                                                    labelPosition="after"
                                                    fullWidth={true}
                                                    onClick={() => this.handleDeleteButtonClick(item.id, item.label)}
                                                />
                                            </TableRowColumn>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>

                        {
                            this.props.items.length !== 0 ? (<Pagination items={this.props.items} initialPage={1} onChangePage={this.onChangePage}/>) : (<div></div>)
                        }

                        {/* Dialog Confirm */}

                        <Dialog
                            title="Warning"
                            open={this.state.openDialog}
                            onRequestClose={this.handleDialogClose}
                            actions={actions}
                        >
                            Are you sure to delete Order {this.state.orderID} / {this.state.orderLabel} ?
                        </Dialog>

                    </article>
                </QueueAnim>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        items: state.items,
    }
}

export default connect(mapStateToProps, { itemsFetchData })(ListOrder);