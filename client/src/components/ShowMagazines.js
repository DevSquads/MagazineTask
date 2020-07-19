import React, { Component } from 'react';
import { Media, Row, Col } from 'reactstrap';
import icon from '../images/pencil-2.svg';
import Article from './Article';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actionCreator from '../redux/actionsCreator';

const MAX_CHARS = 40;
const minimizeText = (text) => {
    if (text.length > MAX_CHARS) {
        //we need to remove remaining chars
        text = text.substring(0, MAX_CHARS);
        text += '...';
    }
    return text;
};

class ShowMagazines extends Component {
    constructor(props)
    {
        super(props);
        this.initiated = false;
    }
    render() {
        let articles = <></>;
        if (!this.initiated) {
            this.initiated=true;
            this.props.magazinesInitiate();
        }
        if (this.props.currPage > 0) {
            const currIndex = this.props.currPage;
            const currPage = this.props.pages[currIndex];
            articles = currPage.map(article => {
                return (
                    <Media className="mt-5 article">
                        <Media>
                            <Media left top>
                                <Media tag="img" src={icon} width={50} height={50} alt="Generic placeholder image" />
                            </Media>
                            <Media body className="ml-3">
                                <Media heading>{article.title} <span className="auther">written by {article.autherName}</span></Media>
                                <span className="ml-3">{minimizeText(article.description)}</span>
                            </Media>
                        </Media>
                    </Media>
                );
            });
        }
        return (
            <>
                <Row className="ml-4 mt-5">
                    <Col sm="4">
                        {articles}
                    </Col>
                    <Col sm="6">
                        <Article isOpen={true} />
                    </Col>
                </Row>


            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        pages: state.pages,
        numPages: state.numPages,
        currPage: state.currPage,
        intiatedMagazine: state.intiatedMagazine
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        getPage: (pageNum) => dispatch(actionCreator.getPage(pageNum)),
        getPageNums: () => dispatch(actionCreator.getPageNums()),
        magazinesInitiate: () => dispatch(actionCreator.magazinesInitiate())
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowMagazines));