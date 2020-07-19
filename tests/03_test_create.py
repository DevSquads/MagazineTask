#!/usr/bin/python

# create a number of articles
NUM_OF_ARTICLES = 10

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

    author_value = "python"
    description_value = "This was written by python"

    for i in range(0, NUM_OF_ARTICLES):
        title = driver.find_elements_by_id('title')[0]
        author = driver.find_elements_by_id('author')[0]
        description = driver.find_elements_by_id('description')[0]
        text = driver.find_elements_by_id('text')[0]
        submit = driver.find_elements_by_id('submit')[0]

        title_value = "create test " + str(i)
        text_value = str(i) + " was all written by python"

        title.send_keys(title_value)
        author.send_keys(author_value)
        description.send_keys(description_value)
        text.send_keys(text_value)
        submit.send_keys(Keys.ENTER)

        msg = driver.find_elements_by_id('msg')[0].text

        if msg == "Article written to disk":
            print("create test ", i, " passed")
        else:
            print("create test ", i, " failed")

        create_button = driver.find_elements_by_class_name('header_button')[1]
        create_button.click()
        #print(msg)

    driver.quit();
except:
    driver.quit()
