
// this is the main file that should be run

// include some node.js modules
const path = require("path");
const fs = require("fs");

// include my modules
const ar = require("./Article.js");
const hf = require("./helper_functions.js");
const st = require("./structures.js");

// default cache directory can be changed in the helper_functions.js
const cache_dir = hf.cache_dir;

// express stuff
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false });

// change localhost to the machines ip in case of a problem in windows
const host = "localhost";
// change the ip if it is used by another app on the system
const port = 8000;

app.use(express.static(__dirname));
app.get('/', function (req, res) {
    //res.sendFile(__dirname + "/root/" + "index.html");
    //res.end(doc_begin + buttons + doc_end);
    res.redirect("/list_articles");
});

// start the server
var server = app.listen(port, function () {
   console.log("Server listening at http://%s:%s", host, port)
});

app.get("/list_articles", urlencodedParser, function (req, res) {
    let files = "";

    if (hf.cache_dir_exists(0))
        fs.readdirSync(cache_dir).forEach(file => {
            files += '<button class="del_article" onclick="delete_article_func(\'' + file + '\')">'
                + 'delete ' + '</button>';
            files += '<button class="article" onclick="open_article_func(\'' + file + '\')">'
                + file.replace(/_/g, " ") + '</button></br>';
        });

    if (files == "")
        hf.print_msg(res, "No articles to show");
    else
        res.end(st.prepare_head("Articles list", "Articles") + st.buttons + st.open_article_form
            + st.open_article_script + st.delete_article_form + st.delete_article_script + files + st.doc_end);

});

app.get("/create_article", urlencodedParser, function (req, res) {
    res.end(st.prepare_head("Create an article", "New article") + st.buttons + st.errs_pr
        + st.create_article_form + st.save_article_script + st.doc_end);
});

app.post("/save_article", urlencodedParser, function (req, res) {
    //console.log(req.body.update);
    let temp = new ar.Article(req.body.title, req.body.author, req.body.description, req.body.text);

    if (temp.save_to_disk(cache_dir + req.body.title, req.body.update))
        if (req.body.update == "false")
            hf.print_msg(res, "Article written to disk");
        else
            hf.print_msg(res, "Article updated");
    else
        hf.print_msg(res, "could not write article to disk");
});

// I need to put the stuff in this way, because otherwise the code might get interpreted as js
// so I need to fill the gaps instead of just dumping text in to prevent interpretation
app.post("/get_article_content", urlencodedParser, function (req, res) {
    //console.log("filename:", req.body.name);
    try {
        var file = fs.readFileSync(cache_dir + req.body.name);
    } catch (err) {
        console.log(err);
        hf.print_msg(res, "could not open file");
    }

    let temp = JSON.parse(file);
    res.send(new ar.Article(temp.title, temp.author, temp.description, temp.text));
});

app.post("/open_article", urlencodedParser, function (req, res) {
    let delete_button = '<button class="form_button" onclick="delete_article_func(\'' + req.body.name + '\')">'
                + 'delete' + '</button>';

    let update_button = '<button class="form_button" onclick="save_article_func(\'true\')" />update</button>';
    let restore_button = '<button class="form_button" onclick="check_and_fill_form()" />restore</button>';

    res.end(st.prepare_head("Update article", "") + st.buttons + st.errs_pr + st.create_article_form
        + st.save_article_script + delete_button + update_button + restore_button + st.delete_article_form
        + st.delete_article_script + st.prepare_form_script(req.body.name) + st.doc_end);
});

app.post("/delete_article", urlencodedParser, function (req, res) {
    try {
        //console.log("deleted", req.body.name);
        fs.unlinkSync(cache_dir + req.body.name);
        res.redirect('/list_articles');
    } catch (err) {
        console.log(err);
        hf.print_msg(res, "could not delete file");
    }
});
