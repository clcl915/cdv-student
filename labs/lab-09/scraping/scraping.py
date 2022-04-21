import requests
import json
from bs4 import BeautifulSoup
from pprint import pprint
print("works! from vsc")

#1. download a webpage in plain text
url = "https://www.serebii.net/pokemon/gen1pokemon.shtml"
url_start = "https://www.serebii.net/pokemon/gen"
url_end = "pokemon.shtml"
data =[]
for i in range(1,9):
    print(i)
    url = url_start + str(i) + url_end
    result = requests.get(url)
    print("scraping", url)
    
    # result = requests.get(url)
    # print(result)
    plain_result = result.text
    # print(plain_result)


    #2. turn plain text into structured html object with the library called Beautiful Soup 
    soup = BeautifulSoup(result.text, 'html.parser')
    # print(soup)
    soup.select("tr")


    #3. Traverse the html structure to find info we need and save all that info into a nicely structured object / python objects are called dictionaries
    # table_of_interest = soup.select(".dextable tr td:nth-child(3)")
    table_of_interest = soup.select_one(".dextable")
    rows = table_of_interest.select("tr")
    # print(rows[0])
    for row in rows[2::2]:
        cells = row.select("td")
        
        pokemonType =[]
        pokemonTypes= cells[4].select("a")
        for typetag in pokemonTypes:
            pokemonType.append(typetag['href'].split("/")[-1])

        pokemonAbility=[]
        pokemonAbilities= cells[5].select("a")
        # pprint(pokemonAbilities)
        for ability in pokemonAbilities:
            pokemonAbility.append(ability.text)
        
        data.append({
            "number" : cells[0].text.strip(),
            "imgSrc" : "https://www.serebii.net" + cells[1].select_one("a")['href'] + cells[1].select_one("img")['src'],
            "title" : cells[3].select_one("a").text,
            "type": pokemonType,
            "ability": pokemonAbility,
            "stats": [ {
                "hp" : cells[6].text.strip(),
                "att" : cells[7].text.strip(),
                "def" : cells[8].text.strip(),
                "s.att" : cells[9].text.strip(),
                "s.def" : cells[10].text.strip(),
                "sp" : cells[11].text.strip()

            }]
        })
        # print("-"*50)
    # print(data)
    # pprint(data)  
    #4. save the dictionary as a data.json file. DONE
    with open("data.json", "w") as outfile:
        json.dump(data,outfile,indent=4)


