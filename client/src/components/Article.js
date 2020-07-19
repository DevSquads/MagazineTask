import React, { Component } from 'react';
import { Media, Button, FormGroup, Label } from 'reactstrap';
import icon from '../images/pencil-2.svg';
import { LocalForm, Control, Errors } from 'react-redux-form';
import * as validator from '../validator';

class Article extends Component {
    constructor(props) {
        super(props);
        this.onEdit = this.onEdit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            showEdit: false
        }
    }
    componentWillReceiveProps(){
        this.setState({ showEdit: false });
    }
    onEdit() {
        this.setState({ showEdit: true });
    }
    handleSubmit(values) {
        this.props.update({id:this.props.article._id,description:values.description},this.props.pageNum);
    }
    handleDelete(){
        this.props.delete(this.props.pageNum,this.props.article._id);
    }
    render() {
        const editAndDeleteButtons = (show) => {
            if (!show) {
                return (
                    <>
                        <span className="ml-3"> <Button color="primary" onClick={this.onEdit}>Edit</Button> </span>
                        <span className="ml-3"> <Button color="danger" onClick={this.handleDelete}>Delete</Button> </span>
                    </>
                );
            }
            return (<></>);
        }
        const showForm = (show) => {
            if (show) {
                return (
                    <>
                        <LocalForm className="mt-5" onSubmit={(values) => this.handleSubmit(values)}>
                            <FormGroup>
                                <Label for="description">Description :</Label>
                                <Control.textarea
                                    cols={50}
                                    rows={8}
                                    model=".description"
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    defaultValue={this.props.article.description}
                                    validators={{ required: validator.required }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".description"
                                    show="touched"
                                    messages={{ required: 'description is required .' }}
                                />
                            </FormGroup>
                            <Button type="submit" className="btn btn-primary">Submit</Button>
                        </LocalForm>
                    </>);
            }
            else {
                return (
                    <Media className="mt-5 ml-5 col-8">
                        <Media body>
                            <p>{this.props.article.description}</p>
                        </Media>
                    </Media>
                );
            }
        }
        return (
            <>
                <Media className="mt-5 article-show">
                    <Media>
                        <Media left top>
                            <Media tag="img" src={icon} width={50} height={50} alt="Generic placeholder image" />
                        </Media>
                        <Media body className="ml-3">
                            <Media heading>{this.props.article.title} <span className="auther">written by {this.props.article.autherName}</span></Media>
                            {editAndDeleteButtons(this.state.showEdit)}
                        </Media>
                    </Media>
                </Media>

                {showForm(this.state.showEdit)}
            </>
        );
    }
}

export default Article;