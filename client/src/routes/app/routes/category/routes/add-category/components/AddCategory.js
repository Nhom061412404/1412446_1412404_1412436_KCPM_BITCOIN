import React, { Component } from 'react';
import QueueAnim from 'rc-queue-anim';

//Material UI Components
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

//Material SVG Icon
import SaveIcon from 'material-ui/svg-icons/content/save';
import RenewIcon from 'material-ui/svg-icons/action/autorenew';

//Custom CSS file
import './index.css';

class AddCategory extends Component {
    render() {
          
        return (
            <div className="container-fluid no-breadcrumbs page-dashboard">
                <QueueAnim type="bottom" className="ui-animate">
                    <article className="article">
                        <h2 className="article-title">Add Category</h2>

                        <div className="box box-default">
                            <div className="add-category-content">
                                <TextField
                                    floatingLabelText="Category Name"
                                    hintText="Name"
                                    fullWidth={true}
                                />
                                <br/>
                                <TextField
                                    floatingLabelText="Category Description"
                                    hintText="Description"
                                    fullWidth={true}
                                />

                                <div className="add-category-action">
                                    <RaisedButton
                                        label="Save & continue"
                                        style={{marginRight: 10, marginTop: 20}}
                                        primary={true}
                                        labelPosition="after"
                                        icon={<SaveIcon />}
                                    />

                                    <RaisedButton
                                        label="Refresh"
                                        labelPosition="after"
                                        style={{marginTop: 20}}
                                        icon={<RenewIcon />} 
                                    />
                                </div>
                            </div>
                        </div>
                    </article> 
                </QueueAnim>
            </div>
        )
    }
}

export default AddCategory;