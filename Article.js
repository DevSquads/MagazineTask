
// this file contains the Article class

const fs = require("fs");
const hf = require("./helper_functions.js");

function Article(title, author, description, text) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.text = text;
    // this writes an article to disk
    this.save_to_disk = function(name, update) {
        // make sure to clean the title because it is used in the list page as is
        // so we don't want html tags or js code, this is not a perfect solution
        // but it is an simple one to avoid using jquery to fill the entire page

        // tempName.replace(/[<>(){}\[\]\`\'\"\;\$\^\&]/g, "") can be used to remove these symbols
        // but you may not catch all
        // so a better way is to only allow alphanumeric (and other) characters like so:
        // tempName.replace(/[^a-z0-9.-_]/gi, "") this only allows alphanumeric dash and period and underscore
        // this name is used to store the file on disk so the user doesn't really care about it

        // also to replace spaces to make it easy to search and copy from the terminal
        let cleanName = name.replace(/ /g, "_").replace(/[^a-z0-9.-_]/gi, "");

        let tempName = cleanName;
        let counter = 2;

        if (update == "false")
            // find un used name, not to overrite an existing article
            while (fs.existsSync(tempName)) {
                //console.log(tempName, "exists");
                tempName = cleanName + counter.toString();
                counter++;
            }

        try {
            // when we call cache_dir_exists with 1 it creates the directory
            // if it is not to be found
            hf.cache_dir_exists(1);
            //console.log("filename:", tempName);
            //console.log("contente:", JSON.stringify(this));

            fs.writeFileSync(tempName, JSON.stringify(this), { mode:0644 });
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
