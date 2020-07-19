const fs = require("fs");

const st = require("./structures.js");

// the default cache directory i.e. where articles are saved
const cache_dir = __dirname + "/cache/";

// prints msg to page
function print_msg(res, msg) {
    res.end(st.buttons + st.prepare_head(msg, "") + "<p id =\"msg\">" + msg + "</p>" + st.doc_end);
}

// checks if file exists
function cache_dir_exists(create) {
    if (fs.existsSync(cache_dir))
        return 1;

    // if create it will create the non-exitent file
    if (create)
        if (!fs.mkdirSync(cache_dir, 0755)) {
            console.log("created cache directory");
            return 1;
        } else
            console.log("could not create cache directory");

    return 0;
}

module.exports = {
    cache_dir, print_msg, cache_dir_exists
};
