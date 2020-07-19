import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import ShowMagazines from './components/ShowMagazines';
import NavBar from './components/NavBar';
import ArticleForm from './components/ArticleForm';

class Main extends Component {
    render()
    {
        return (
            <>
                <NavBar/>
                <Switch>
                    <Route path="/" exact>
                        <ShowMagazines/>
                    </Route>
                    <Route path="/write-article" exact>
                        <ArticleForm/>
                    </Route>
                    <Route path="/*">
                        <h3>Error:Not Expected Path</h3>
                    </Route>
                </Switch>
            </>
        );
    }  
}

export default Main;