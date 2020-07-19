
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
                success: function set_form_defaults(result) {
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
    <input id="article_name"i name="name" type="hidden" maxlength="255" />
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
    <input id="delete_article_name"i name="name" type="hidden" maxlength="255" />
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
    <input id="title" name="title" maxlength="255" />
    <a class="input_title">author:</a>
    <input id="author" name="author" maxlength="255" />
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
