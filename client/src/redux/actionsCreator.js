import * as actionTypes from './actionTypes';

  

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
        .catch(err => dispatch({type:actionTypes.GET_PAGE_NUMS,err:err}));
    };
};

export const updateArticle = (input,pageNum) =>{
    return (dispatch) => {
        doRequest('http://localhost:5000/api/update','POST',input)
        .then(res => dispatch({type:actionTypes.UPDATE,article:res,pageNum:pageNum}))
        .catch(err => dispatch({type:actionTypes.UPDATE,err:err}));
    }
}
export const deleteArticle = (pageNum,id) => {
    return (dispatch) => {
        doRequest('http://localhost:5000/api/delete/'+String(id),'GET',null)
        .then(res => dispatch({type:actionTypes.DELETE,id:id,pageNum:pageNum}))
        .catch(err => dispatch({type:actionTypes.DELETE,err:err}));
    }
}
export const setCreatedNull = () => {
    return {type:actionTypes.SET_DEFAULT_CREATED};
}

export const showArticle = (article) => {
    return {type:actionTypes.SHOW_ARTICLE,article:article};
}

export const showPage = (pageNum) => {
    return {type:actionTypes.SHOW_PAGE,pageNum:pageNum};
}