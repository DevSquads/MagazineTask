
export default class Actions {
    constructor(state){
        this.state = JSON.parse(JSON.stringify(state));
        this.addArticle = this.addArticle.bind(this);
        this.setCreated = this.setCreated.bind(this);
        this.addPage = this.addPage.bind(this);
        this.deleteArticle = this.deleteArticle.bind(this);
        this.updateArticle = this.updateArticle.bind(this);
        this.getPageNums = this.getPageNums.bind(this);
        this.magazinesInitiated = this.magazinesInitiate.bind(this);

    }
    getPageNums(count,err)
    {
        if(err) return this.state;
        this.state.numPages = count;
        return this.state;
    }
    addArticle(article,err){
        if(err){
            this.state.created = {
                valid:false,
                error:err.message
            }
            return this.state
        }
        this.state.created = {
            valid:true,
            article:article
        }
        return this.state;
    }
    setCreated(created){
        this.state.created = created;
        return this.state;
    }
    addPage(pageNum,pageData,err){
        if(err) return this.state;
        this.state.pages[pageNum] = pageData; // getting page and add it into Map dataStructure
        this.state.currPage =  pageNum;
        this.state.showedArticle = null;
        return this.state;  
    }
    magazinesInitiate(numPages,pageData,err){
        if(err) return this.state;
        this.state.pages = new Map();
        this.state.numPages = numPages;
        return this.addPage(1,pageData,null);
    }
    deleteArticle(pageNum,articleId,err){
        if(err)return this.state;
        this.state.showedArticle = null;
        this.state.pages[pageNum] = this.state.pages[pageNum].filter(article => article._id !== articleId);
        return this.state;
    }
    updateArticle(pageNum,articleId,description,err){
        if(err)return this.state;
        this.state.pages[pageNum] = this.state.pages[pageNum].map(article => {
            if(article._id === articleId){
                article.description = description;
            }
            return article;
        });
        this.state.showedArticle = null;
        return this.state;
    }
    showPage(pageNum){
        this.state.currPage = pageNum;
        this.state.showedArticle = null;
        return this.state;
    }
    showArticle(article){
        this.state.showedArticle = article;
        return this.state;
    }
}