#!/usr/bin/python

# just a basic test to see if basic functionality works

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

    title_value = "basic test"
    author_value = "python"
    description_value = "This was written by python"
    text_value = "This was all written by python to test the basic functionality of the program"

    title.send_keys(title_value)
    author.send_keys(author_value)
    description.send_keys(description_value)
    text.send_keys(text_value)
    submit.send_keys(Keys.ENTER)

    wait = WebDriverWait(driver = driver, timeout = 900)

    msg = driver.find_elements_by_id('msg')[0].text
    #print(msg)

    if msg == "Article written to disk":
        print("basic test passed")
    else:
        print("basic test failed")

    driver.quit();
except:
    driver.quit();
