#!/usr/bin/python

# delete a number of articles

# this file along with the create article can be expanded to manage large scale create/delete stuff
# but this is very inefficient, and can be done better with a shell script
# however for other operations this can be useful

import time

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

#try:
driver.get('http://localhost:8000/list_articles')

wait = WebDriverWait(driver = driver, timeout = 900)

# uncomment to see stop the process after the browser is opened
#wait = input("ready?")

for i in range(0, NUM_OF_ARTICLES):
    buttonName = "create test " + str(i)
    driver.find_element_by_xpath('//button[text()="'+ buttonName + '"]').click()
    driver.find_element_by_xpath('//button[text()="delete"]').click()
    driver.switch_to.alert.accept()
    print(buttonName + " deleted successfully")

time.sleep(1)

driver.quit();
#except:
    #driver.quit();

