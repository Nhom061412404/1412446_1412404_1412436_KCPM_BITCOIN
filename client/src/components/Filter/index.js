import React, { Component } from 'react';

//Custom CSS file
import './index.css';

//Material UI Components
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';

//Material SVG Icon
import SearchIcon from 'material-ui/svg-icons/action/search';
import CancelIcon from 'material-ui/svg-icons/content/clear';

//Helper Function
import { formatUrlDateString, formatUrlTimeString } from '../../utils/helper';


class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: '',
            endDate: '',
            startTime: '',
            endTime: '',
            startConditionStr: '',
            endCondititonStr: '',
        }
    }

    handleCancelClick = () => {
        this.props.onCancelClick();
    }

    handleSearchClick = () => {
        let url = "http://marika.api/order/list/?startime=" + this.state.startDate + this.state.startTime + "&endtime=" + this.state.endDate + this.state.endTime;
        this.props.onSearchClick(url);
    }

    handleStartDateChange = (e, date) => {
        this.setState({ startDate: formatUrlDateString(date) });
    }

    handleStartTimeChange = (e, time) => {
        this.setState({ startTime: formatUrlTimeString(time) });
    }

    handleEndDateChange = (e, date) => {
        this.setState({ endDate: formatUrlDateString(date) });
    }

    handleEndTimeChange = (e, time) => {
        this.setState({ endTime: formatUrlTimeString(time) });
    }

    render() {
        return (
            <div className="box box-default">

                <div className="search-condition">
                    <DatePicker
                        id="start-date"
                        style={{marginRight: 20}}
                        hintText="Start Date"
                        onChange={this.handleStartDateChange}
                    />
                    <TimePicker
                        id="start-time"
                        hintText="Start Time"
                        format="24hr"
                        onChange={this.handleStartTimeChange}
                    />

                    <h4 className="splash">~</h4>

                    <DatePicker
                        id="end-date"
                        style={{marginRight: 20}}
                        hintText="End Date"
                        onChange={this.handleEndDateChange}
                    />
                    <TimePicker
                        id="end-time"
                        hintText="End Time"
                        format="24hr"
                        onChange={this.handleEndTimeChange}
                    />
                </div>
               
                <div className="search-action">
                    <RaisedButton
                        label="Search"
                        style={{ marginRight: 10, marginBottom: 20, marginTop: 10 }}
                        labelPosition="after"
                        icon={<SearchIcon />}
                        secondary
                        onClick={this.handleSearchClick}
                    />

                    <RaisedButton
                        label="Cancel"
                        backgroundColor="#D50000"
                        labelColor="#ffffff"
                        style={{ marginBottom: 20, marginTop: 10, marginRight: 20 }}
                        icon={<CancelIcon />}
                        labelPosition="after"
                        onClick={this.handleCancelClick}
                    />
                </div>
            </div>
        )
    }
}

export default Filter;