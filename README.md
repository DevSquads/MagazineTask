# Rerquirements
- The program is written in node.js so you need node installed and of course a web browser.
- The program used express and jquery, probably you will need to install the former but not the latter.
- Jquery may require an internet connection, maybe you can change its path to a local instance
- Make sure no other program is listening on port 8000 (or change the port in the server file).
- If localhost can't be understood to mean the local machine by the OS, change it to the ip of the machine.
- If the program is going to be accessed from another machine make sure to open the port in the firewall.

- To run the tests you need python, selenium, chromedriver. The python environment, including these, should be all in the tests folder (for Linux atleast).
*NOTE* maybe some python module or chrome would need to be reinstalled and you need to change the path of the chrome executable inside each file.

- Take care not to run 04_test_delete.py on a production system because it deletes articles. and maybe run 04 right after 03 because if the files aren't their it 04 fail.

# steps
- Run the server.js file: node server.js
- open the webpage in a web browser: http://localhost:8000/
- run the tests if you want

# MagazineTask

# Description
- Fork the repo to your Github https://help.github.com/en/articles/fork-a-repo.
- Push your work to your forked repo "user-name/MagazineTask".
- Create pull request in the original repo "devsquads/MagazineTask"

# Story
Samir the chief editor in “legen- wait for it-dary news” asked the magazine owner Yehia to make him an appointment with DevSquads their technical partner to ask them for help.
He wants to make an app that would help his writers create new articles and manage them, every article has a title, description, and author name.


# Requirements
- List of articles.
- Create article.
- Delete article.
- Update article.

- Well organized code is a MUST.
- Edit README to include the required steps to run your application.

# Stack
-  NodeJS  / Python .

# nice to have
- Unit tests.

# Task Deadline
- Monday Morning 20/07/2020.
