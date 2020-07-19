import React, { Component } from 'react';

class Article extends Component{
    render(){
        if(!this.props.isOpen) return (<></>);
        return (<h1>Hello World</h1>);
    }
}

export default Article;