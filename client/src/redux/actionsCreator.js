import * as actionTypes from './actionTypes';
import { create } from 'apisauce'

const api = create({
    baseURL: 'http://localhost:5000/api',
    headers: { Accept: 'application/json' },
  })
  

async function doRequest(url, method, body) {
    let formBody = [];
    if(method === 'POST' || method === 'PUT'){
        for (let property in body) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(body[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
    }
    let requestOptions = method ==='POST' || method === 'PUT'? {
        method: method,
        headers: {"Content-Type":"application/x-www-form-urlencoded" },
        body: formBody
    }: {
        method:method,
        mode:'cors'
    };
    try {
        let response = await fetch(url, requestOptions);
        response = await response.json();
        return response;
    }
    catch(err){
        throw err;
    }
}


export const createArticle = (data) => {
    return (dispatch) => {
        const body = {
            title:data.title,
            description:data.description,
            autherName:data.autherName
        };
        doRequest('http://localhost:5000/api/create','POST',body)
        .then(res => dispatch({type:actionTypes.CREATE,article:res}))
        .catch(err => dispatch({type:actionTypes.CREATE,err:err}))
    }
}
export const getPage = (pageNum) => {
    return (dispatch) => {
        // api.get('/page/'+String(pageNum))
        // .then(res => dispatch({type:actionTypes.GET_PAGE,page:res.data,pageNum:pageNum}))
        // .catch(err => dispatch({type:actionTypes.GET_PAGE,err:err}))
        doRequest('http://localhost:5000/api/page/'+String(pageNum),'GET',null)
        .then(res => dispatch({type:actionTypes.GET_PAGE,page:res,pageNum:pageNum}))
        .catch(err => dispatch({type:actionTypes.GET_PAGE,err:err}));
    };

};

export const magazinesInitiate = () => {
    return (dispatch) => {
        doRequest('http://localhost:5000/api/page-with-count/1','GET',null)
        .then(res => dispatch({type:actionTypes.MAGAZINE_INITIATED,page:res.page,count:res.count}))
        .catch(err => dispatch({type:actionTypes.MAGAZINE_INITIATED,err:err}));
    }
};

export const getPageNums = () => {
    return (dispatch) => {
        doRequest('http://localhost:5000/api/numpages','GET',null)
        .then(res => dispatch({type:actionTypes.GET_PAGE_NUMS,count:res.count}))
        .catch(err => dispatch({type:actionTypes.GET_PAGE_NUMS,err:err}))
    };
};
export const setCreatedNull = () => {
    return {type:actionTypes.SET_DEFAULT_CREATED};
}