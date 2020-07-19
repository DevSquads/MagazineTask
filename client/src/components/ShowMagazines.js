import React, { Component } from 'react';
import { Media, Row, Col } from 'reactstrap';
import icon from '../images/pencil-2.svg';
import Article from './Article';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actionCreator from '../redux/actionsCreator';
import ArticlePagination from './ArticlePagination';

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
    constructor(props) {
        super(props);
        this.initiated = false;
        this.showArticle = this.showArticle.bind(this);
    }
    showArticle(article) {
        this.props.showArticle(article);
    }
    render() {
        let articles = <></>;
        if (!this.initiated) {
            this.initiated = true;
            this.props.magazinesInitiate();
        }
        if (this.props.currPage > 0) {
            const currIndex = this.props.currPage;
            const currPage = this.props.pages[currIndex];
            articles = currPage.map(article => {
                return (
                    <Media className="mt-5 article" onClick={() => this.showArticle(article)}>
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

        const articleShowed = (article) => {
            if (article) {
                return (<Article article={article} update={this.props.update} pageNum={this.props.currPage} delete={this.props.delete} />);
            }
            else {
                return (
                    <>
                        <Row>
                            <Col sm="7"><h2>Welcome In Magazine App...</h2></Col>
                        </Row>
                        <Row>
                            <Col sm="6" className="mt-3"><a className="btn btn-info" href="/write-article">Write Your Article</a></Col>
                        </Row>
                    </>
                );
            }
        }
        return (
            <>
                <Row className="ml-4 mt-5">
                    <Col sm="4">
                        {articles}
                    </Col>
                    <Col sm="6">
                        {articleShowed(this.props.showedArticle)}
                    </Col>
                </Row>
                <Row>
                    <Col sm="4" className="m-auto">
                        <ArticlePagination pages={this.props.pages}
                            currPage={this.props.currPage}
                            numPages={this.props.numPages}
                            showPage={this.props.showPage}
                            getPage={this.props.getPage} />
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
        intiatedMagazine: state.intiatedMagazine,
        showedArticle: state.showedArticle
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        getPage: (pageNum) => dispatch(actionCreator.getPage(pageNum)),
        getPageNums: () => dispatch(actionCreator.getPageNums()),
        magazinesInitiate: () => dispatch(actionCreator.magazinesInitiate()),
        update: (input, pageNum) => dispatch(actionCreator.updateArticle(input, pageNum)),
        showArticle: (article) => dispatch(actionCreator.showArticle(article)),
        delete: (pageNum, id) => dispatch(actionCreator.deleteArticle(pageNum, id)),
        showPage: (pageNum) => dispatch(actionCreator.showPage(pageNum))
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowMagazines));