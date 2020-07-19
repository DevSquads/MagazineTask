import React, { Component } from 'react';
import { Media, Alert } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Button, FormGroup, Label } from 'reactstrap';
import * as validator from '../validator';
import { connect } from 'react-redux';
import * as actionCreator from '../redux/actionsCreator';
import { withRouter } from 'react-router-dom';
class ArticleForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillMount(){
        this.props.setCreatedNull();
    }
    handleSubmit(values) {
        this.props.create(values);
    }
    render() {
        let alert = <></>;
        if (this.props.created && this.props.created.valid) {
            alert = <Alert color="success">thank You Writer/{this.props.created.article.autherName} Your Article Created Sucessfuly</Alert>;

        }
        else if (this.props.created && !this.props.created.valid) {
            alert = <Alert color="danger">Sorry there is some Wrong in Submision "{this.props.created.error}"</Alert>;
        }
        return (
            <>
                <Media className="m-auto col-6">
                    <Media body className="mt-5">
                        <h2>Write Your Article...</h2>
                        {alert}
                        <LocalForm className="mt-5" onSubmit={(values) => this.handleSubmit(values)}>
                            <FormGroup>
                                <Label for="autherName">Auther Name :</Label>
                                <Control.text
                                    model=".autherName"
                                    className="form-control"
                                    name="autherName"
                                    id="autherName"
                                    placeholder="Your Name (Auther Name)"
                                    validators={
                                        { required: validator.required, isName: validator.isName }
                                    }
                                />
                                <Errors
                                    className="text-danger"
                                    model=".autherName"
                                    show="touched"
                                    messages={{ required: 'name is required .', isName: 'name should be started with Capital letter like A not a and at least length 3' }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="title">Title :</Label>
                                <Control.text
                                    model=".title"
                                    className="form-control"
                                    name="title"
                                    id="title"
                                    placeholder="Article's Title"
                                    validators={{ required: validator.required }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".title"
                                    show="touched"
                                    messages={{ required: 'title is required .' }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="description">Description :</Label>
                                <Control.textarea
                                    cols={50}
                                    rows={8}
                                    model=".description"
                                    className="form-control"
                                    id="description"
                                    name="description"
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
                    </Media>
                </Media>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return { created: state.created }
};
const mapDispatchToProps = (dispatch) => {
    return {
        create: (data) => dispatch(actionCreator.createArticle(data)),
        setCreatedNull: () => dispatch(actionCreator.setCreatedNull())
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ArticleForm));