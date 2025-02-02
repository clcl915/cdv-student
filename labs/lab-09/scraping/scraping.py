import requests
import json
import urllib.request
import shutil
import os
from bs4 import BeautifulSoup
from pprint import pprint
print("works! from vsc")

#1. download a webpage in plain text
# url = "https://www.serebii.net/pokemon/gen1pokemon.shtml"
# url_start = "https://www.serebii.net/pokemon/gen"
# url_end = "pokemon.shtml"
# data =[]
# os.chdir('images')
# for i in range(8,9): 
#     print(i)
#     url = url_start + str(i) + url_end
#     result = requests.get(url)
#     print("scraping", url)
    
#     # result = requests.get(url)
#     # print(result)
#     plain_result = result.text
#     # print(plain_result)


#     #2. turn plain text into structured html object with the library called Beautiful Soup 
#     soup = BeautifulSoup(result.text, 'html.parser')
#     # print(soup)
#     soup.select("tr")


#     #3. Traverse the html structure to find info we need and save all that info into a nicely structured object / python objects are called dictionaries
#     # table_of_interest = soup.select(".dextable tr td:nth-child(3)")
#     table_of_interest = soup.select_one(".dextable")
#     rows = table_of_interest.select("tr")


#     # print(rows[0])
#     for row in rows[2::2]:
#         cells = row.select("td")
#         # GET IMG SRC 
#         # print("Current working directory: {0}".format(os.getcwd()))
#         image_url = "https://www.serebii.net"  + cells[1].select_one("img")['src']
#         with open(cells[0].text.strip() + '.png','wb') as f:
#             response = requests.get(image_url, stream=True) 
#             f.write(response.content)
        # print(image_url,response.status_code)

        # # GET TYPE 
        # pokemonType =[]
        # pokemonTypes= cells[4].select("a")
        # for typetag in pokemonTypes:
        #     pokemonType.append(typetag['href'].split("/")[-1])

        # # GET ABILITIES 
        # pokemonAbility=[]
        # pokemonAbilities= cells[5].select("a")
        # for ability in pokemonAbilities:
        #     pokemonAbility.append(ability.text)
        
        # data.append({
        #     "number" : cells[0].text.strip(),
        #     "imgSrc" : "https://www.serebii.net" + cells[1].select_one("img")['src'],
        #     "title" : cells[3].select_one("a").text,
        #     "type": pokemonType,
        #     "ability": pokemonAbility,
        #     "stats": [ {
        #         "hp" : cells[6].text.strip(),
        #         "att" : cells[7].text.strip(),
        #         "def" : cells[8].text.strip(),
        #         "s.att" : cells[9].text.strip(),
        #         "s.def" : cells[10].text.strip(),
        #         "sp" : cells[11].text.strip()

        #     }]
        # })
        # print("-"*50)
    # print(data)
    # pprint(data)  
    #4. save the dictionary as a data.json file. DONE
    # with open("data.json", "w") as outfile:
    #     json.dump(data,outfile,indent=4)


# 2. Scrape Pokemon by Shape 
url = "https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_shape"
data =[]
os.chdir("ignore-this")
os.chdir('byshape-images')
result = requests.get(url)
print("scraping", url)
plain_result = result.text
soup = BeautifulSoup(result.text, 'html.parser')
# print(soup)
# soup.select("table tr")


#3. Traverse the html structure to find info we need and save all that info into a nicely structured object / python objects are called dictionaries
# table_of_interest = soup.select(".dextable tr td:nth-child(3)")
titles = soup.select(".mw-headline")
# print(titles[5])
table_of_interest = soup.select("table")
# rows = table_of_interest.select("tr")
i=3

# print(table_of_interest[1])
for table in table_of_interest[1:15]:
    # print("Current working directory: {0}".format(os.getcwd()))
    i+=1
    title = titles[i].text.lstrip()
    title = title.replace(" ","-")
    print(title)
    # print(title.text.strip())
    cells = table.select("td")
    current_directory = os.getcwd()
    os.mkdir(title) 
    os.chdir(title)
    rows= table.select("tr")
    for row in rows[1:]:
        imgCell = row.select_one("th")
        imgsrc = imgCell.select_one("img")["src"]
        imgsrc = 'http://' + imgsrc[2:]
        with open(row.select_one("td").text.strip().replace("#","") + '.png','wb') as f:
            response = requests.get(imgsrc, stream=True) 
            f.write(response.content)
        print(imgsrc,response.status_code)
    os.chdir('..')
        # print(imgsrc)
#     # GET IMG SRC 
#     image_url = "https://www.serebii.net"  + cells[1].select_one("img")['src']
#     with open(cells[0].text.strip() + '.png','wb') as f:
#         response = requests.get(image_url, stream=True) 
#         f.write(response.content)