from bs4 import BeautifulSoup
import requests


def webscrape(socialIssue):
    URL = 'https://www.sciencedaily.com'
    r = requests.get(URL)
    return r.json()

#https://www.sciencedaily.com/search/?keyword=environmental+issues#gsc.tab=0&gsc.q=${socialIssue}&gsc.sort=date

print(webscrape('https://www.sciencedaily.com'))