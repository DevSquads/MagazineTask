#!/usr/bin/python

# feed it a lot of html, js and css, and see if the code gets interpreted

from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
import time

options = webdriver.ChromeOptions()
options.binary_location = "/usr/bin/chromium"

# uncomment to make it run in the background i.e. without a browser window
#options.add_argument("--headless");

chrome_driver_binary = "/usr/bin/chromedriver"
driver = webdriver.Chrome(chrome_driver_binary, options=options)

try:
    driver.get('http://localhost:8000/create_article')

    wait = WebDriverWait(driver = driver, timeout = 900)

    # uncomment to see stop the process after the browser is opened
    #wait = input("ready?")

    title = driver.find_elements_by_id('title')[0]
    author = driver.find_elements_by_id('author')[0]
    description = driver.find_elements_by_id('description')[0]
    text = driver.find_elements_by_id('text')[0]
    submit = driver.find_elements_by_id('submit')[0]

    title_value = "code test"
    author_value = "python"
    description_value = "This was written by python"
    text_value = ''' // this file contains the Article class

const fs = require("fs");
const hf = require("./helper_functions.js");

function Article(title, author, description, text) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.text = text;
    // this writes an article to disk
    this.save_to_disk = function(name, update) {
        let tempName = name;
        let counter = 2;

        if (update == "false")
            // find un used name, not to overrite an existing article
            while (fs.existsSync(tempName)) {
                //console.log(tempName, "exists");
                tempName = name + counter.toString();
                counter++;
            }

        try {
            // when we call cache_dir_exists with 1 it creates the directory
            // if it is not to be found
            hf.cache_dir_exists(1);
            //console.log("filename:", tempName);
            //console.log("contente:", JSON.stringify(this));

            // make sure to clean the title because it is used in the list page as is
            // so we don't want html tags or js code, this is not a perfect solution
            // but it is an simple one to avoid using jquery to fill the entire page

            // tempName.replace(/[<>(){}\[\]\`\'\"\;\$\^\&]/g, "") can be used to remove these symbols
            // but you may not catch all
            // so a better way is to only allow alphanumeric (and other) characters like so:
            // tempName.replace(/[^a-z0-9.-_]/gi, "") this only allows alphanumeric dash and period and underscore
            // this name is used to store the file on disk so the user doesn't really care about it
            fs.writeFileSync(tempName.replace(/ /g, "_").replace(/[^a-z0-9.-_]/gi, ""), // also to replace spaces to make it easy
                JSON.stringify(this), { mode:0644 });                                   // to search and copy from the terminal
            return 1;
        } catch (err) {
            console.log(err);
            return 0;
        }
    }
}

module.exports = {
    Article,
};

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
        + st.creat_article_form + st.save_article_script + st.doc_end);
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
// this file contains some structures used in the html

// maybe I should consider merging the open article form and script
// also the delete article form and script ...

// doc beginning and end
function prepare_head(title, page_title) {
    return `<!DOCTYPE HTML>
    <html>
        <head>
            <meta charset="UTF-8" />
            <title>${title}</title>
            <link rel="stylesheet" type="text/css" href="style.css">
            <script src="https://code.jquery.com/jquery-latest.min.js"></script>
        </head>
        <body>
            <div id="main">
                <a2 id="page_title">${page_title}</a2>`;
}

function prepare_form_script(name) {
    return `<script>
        onload = fill_form();
        function fill_form() {
            let result = $.ajax({
                type: "POST",
                url: "/get_article_content",
                data: { name: "${name}" },
                dataType: "json",
                async: true,
                success: function set_form_defaults(rsult) {
                            //console.log(result);
                            //console.log(result.title);
                            //console.log(result.author);
                            //console.log(result.description);
                            //console.log(result.text);
                            $("#title").val(result.title)
                            $("#author").val(result.author)
                            $("#description").val(result.description)
                            $("#text").val(result.text)
                        }
            });
            document.getElementById("submit").innerText = "save draft";
        }

        function check_and_fill_form() {
            if (confirm("Are you sure you want to restore this article to its saved version?"))
                fill_form();
        }
    </script>
    `;
}

const doc_end =
`       </div>
    </body>
</html>`;

// open article
const open_article_form =
`<form id="open_article" action="/open_article" method="post">
    <input id="article_name"i name="name" type="hidden" maxlength="256" />
</form>`;

const open_article_script =
`<script>
    function open_article_func(name) {
        document.getElementById("article_name").value = name;
        document.getElementById("open_article").submit();
    }
</script>`;

// delete article
const delete_article_form =
`<form id="delete_article" action="/delete_article" method="post">
    <input id="delete_article_name"i name="name" type="hidden" maxlength="256" />
</form>`;

const delete_article_script =
`<script>
    function delete_article_func(name) {
        if (confirm("Are you sure you want to delete this article", name, "?")) {
            document.getElementById("delete_article_name").value = name;
            document.getElementById("delete_article").submit();
        }
    }
</script>`;

// save article

// remove if statements below to allow an article to have an empty description or author for example
// *NOTE* never allow the title to be empty because it would be the file name and it doesn't make sense
const save_article_script =
`<script>
    function save_article_func(update) {
    let msg = "";
        if (document.getElementById("title").value == "")
            msg += "title can't be empty</br>";
        if (document.getElementById("author").value == "")
            msg += "author can't be empty</br>";
        if (document.getElementById("description").value == "")
            msg += "description can't be empty</br>";
        if (document.getElementById("text").value == "")
            msg += "article body can't be empty</br>";

        //console.log(update);

        if (msg != "")
            document.getElementById("errors").innerHTML = msg;
        else {
            if (update == "false") {
                document.getElementById("bool_update").value = "false";
                document.getElementById("create_article").submit();
            } else if (update == "true" && confirm("Are you sure you want to overwrite this article",
                        document.getElementById("title").value, "?")) {
                document.getElementById("bool_update").value = "true";
                document.getElementById("create_article").submit();
            }
        }
    }
</script>`;

const create_article_form =
`<form id="create_article" action="/save_article" method="post">
    <a class="input_title">title:</a>
    <input id="title" name="title" maxlength="256" />
    <a class="input_title">author:</a>
    <input id="author" name="author" maxlength="256" />
    <a class="input_title">description:</a>
    <textarea id="description" name="description" rows="4" cols="32"></textarea>
    <a class="input_title">text:</a>
    <textarea id="text" name="text" rows="32" cols="64"></textarea>
    <input id="bool_update" name="update" type="hidden" />
</form>
<button id="submit" class="form_button" onclick="save_article_func('false')">create article</button>`;

// the header buttons
const buttons =
`<div id="header_div">
    <form class="header_form" action="/list_articles" method="get">
        <input class="header_button" type="submit" value="List articles">
    </form>
    <form class="header_form" action="/create_article" method="get">
        <input class="header_button" type="submit" value="Create an article">
    </form>
</div>`;

// error paragraph
const errs_pr = '<p id="errors"></p>';

module.exports = {
    prepare_head, prepare_form_script, doc_end, open_article_form, open_article_script,
    delete_article_form, delete_article_script, save_article_script, create_article_form,
    buttons, errs_pr
};

/* elements styles */

body {
    background-color: #F0FFFF;
}

a {
    font-size: 1.5em;
}

form {
    padding-left: 30px;
}

/* main body */
#main {
    margin-bottom: 20px;
    width: 100%;
}

#page_title {
    display: block;
    text-align: center;
    font-size: 2em;
    top: 40px;
}

/* header and header buttons */

#header_div {
    display: block;
    float: left;
    top: 0px;
    width: 100%;
    height: 5%;
    min-height: 25px;
    padding: 0px;
    margin: 0px;
}

.header_form {
    display: inline;
    padding: 0px;
    margin: 0px;
}

.header_button {
    width: 30%;
    display: inline;
    padding: 10px 5% 10px 5%;
    margin: 10px 7% 10px 7%;
    max-height: 40px;
    min-width: 200px;
    background-color: #FFF8DC;
    border-color: #2F4F4F;
    color: #808080;
}

/* create article form and its elementes */

#create_article * {
    display: block;
    padding: 4px;
}

#create_article {
    display: block;
    width: 100%;
    height: 100%;
}

.form_button {
    position: relative;
    left: 40px;
    padding: 10px;
    margin: 10px;
    background-color: #E6E6FA;
    color: black;
}

/* other ui elements */

.del_article {
    padding: 3px;
    margin: 20px;
    left: 40%;
}

#msg {
    position: absolute;
    display: block;
    top: 15%;
}

.article {
    padding: 7px;
    margin: 20px;
    background-color: #ADD8E6;
    border: unset;
    border-radius: 10px;
}

'''

    title.send_keys(title_value)
    author.send_keys(author_value)
    description.send_keys(description_value)
    text.send_keys(text_value)
    submit.send_keys(Keys.ENTER)

    wait = WebDriverWait(driver = driver, timeout = 900)

    msg = driver.find_elements_by_id('msg')[0].text
    #print(msg)

    if msg == "Article written to disk":
        print("code test passed")
    else:
        print("code test failed")

    driver.quit();
except:
    driver.quit();
