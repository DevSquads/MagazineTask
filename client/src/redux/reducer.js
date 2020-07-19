import * as actionTypes from './actionTypes';
import Actions from './Actions';

export const initialState = {
    pages:new Map(),
    numPages:0,
    currPage:0,
    created:null
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
        default:
            return state;    
    }
};