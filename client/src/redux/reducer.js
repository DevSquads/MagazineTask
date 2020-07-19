import * as actionTypes from './actionTypes';
import Actions from './Actions';

export const initialState = {
    pages:new Map(),
    numPages:0,
    currPage:0,
    created:null,
    showedArticle:null
};


export const Reducer = (state = initialState , action) => {
    let actions = new Actions(state);
    switch(action.type){
        case actionTypes.CREATE:
            return actions.addArticle(action.article,action.err);
        case actionTypes.SET_DEFAULT_CREATED:
            return actions.setCreated(null);
        case actionTypes.GET_PAGE:
            return actions.addPage(action.pageNum,action.page,action.err);
        case actionTypes.GET_PAGE_NUMS:
            return actions.getPageNums(action.count,action.err);  
        case actionTypes.MAGAZINE_INITIATED:
            return actions.magazinesInitiate(action.count,action.page,action.err);
        case actionTypes.UPDATE:
            if(action.err) return actions.updateArticle(null,null,null,action.err);
            return actions.updateArticle(action.pageNum,action.article._id,action.article.description,null);
        case actionTypes.SHOW_ARTICLE:
            return actions.showArticle(action.article);
        case actionTypes.DELETE:
            return actions.deleteArticle(action.pageNum,action.id,action.err);
        case actionTypes.SHOW_PAGE:
            return actions.showPage(action.pageNum);                              
        default:
            return state;    
    }
};