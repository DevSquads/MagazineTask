import React, { Component } from 'react';
import { PaginationItem, PaginationLink, Pagination } from 'reactstrap';

class ArticlePagination extends Component {
    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }
    onClick(pageNum) {
        if (this.props.pages[pageNum]) {
            this.props.showPage(pageNum);
        }
        else {
            this.props.getPage(pageNum);
        }
    }
    render() {

        let pages = [];
        for (let i = 1; i <= this.props.numPages; i++) {
            if (i === this.props.currPage) {
                pages.push(
                    (<PaginationItem disabled>
                        <PaginationLink href="#">
                            {i}
                        </PaginationLink>
                    </PaginationItem>)
                );
            }
            else {
                pages.push(
                    (<PaginationItem>
                        <PaginationLink onClick={() => this.onClick(i)} href="#">
                            {i}
                        </PaginationLink>
                    </PaginationItem>)
                );
            }
        }
        return (
            <Pagination aria-label="Page navigation example" className="m-auto">
                {pages}
            </Pagination>
        );
    }
}

export default ArticlePagination;