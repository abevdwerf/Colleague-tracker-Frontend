# Change Log
## V23 - 06/12/2022
Belangrijk! We hebben de database leeg gemaakt dus jullie zullen volledig opnieuw moeten inloggen

Deze release bevat de volgende aanpassingen:

- Zodra je iemand notified zal de knop uitgeschakeld worden voor het komende kwartier zodat je niet iemand kan blijven notifyen.
- Het toevoegen van MAC-Adressen heeft nu daadwerkelijk zin want deze worden nu al gebruikt om te kijken of je op kantoor bent.
- De tijden instellen voor je status werkt nu een stuk beter, je krijgt ook betere feedback zodat je goed ziet welke status je hebt en wanneer deze geld.
- In de backend kan ik al herkennen of een MAC-Adres/User aanwezig is op kantoor, dit kan je alleen nog niet in de front-end zien maar dat zullen we spoedig maken.

## V22 - 29/11/2022
Deze release bevat de volgende aanpassingen:

-Push Notifications bij onbekende status om half 10 's ochtends en als iemand je nodig heeft
-MAC-Adressen toevoegen, aanpassen en verwijderen
-Tijden voor status instellen op profiel pagina

Bekende Bugs:
-Push Notifications werken alleen wanneer de app gesloten of op de achtergrond is, niet wanneer deze open staat
-De tijden instellen werkt alleen voor 9 uur 's ochtends en na 5 uur 's middags. Dit komt omdat dit de standaard waarden zijn, en als de huidige tijd buiten deze tijden vallen worden ze als ongeldig gezien door de backend. Deze standaard tijden springen nu namelijk nog terug na het aanpassen.
## v21 - 22/11/2022
De vorige release had een paar grote problemen waar we pas later achter kwamen waardoor deze niet functioneel was, dit is nu allemaal opgelost.

Een ding wat wel perongeluk er nog in zit is dat je tijdens opstarten meerdere popups krijgt, deze gebruiken wij om tokens op te halen voor het versturen van push notifications maar heeft verder dus geen functie


## v20 - 22/11/2022
Deze release is wat kleiner dan normaal, dit komt omdat we vooral in de backend bezig zijn geweest en met dingen die niet direct impact hebben op de app.

Je kan nu een tijd aangeven op je profielpagina om aan te geven voor hoelang de status geld, deze heeft verder nog geen functie en is puur UI.

De locatie knoppen zijn duidelijker gemaakt, we horen graag of het nu duidelijk genoeg is.

Mac-Address pagina afgemaakt, deze heeft echter ook nog geen functie en is puur UI

De zoekfunctie is niet meer hoofdlettergevoelig

Een paar andere styling aanpassingen op andere pagina's

## v19 - 15/11/2022
In deze versie hebben we een zoek & filter functie gemaakt, de gebruiker kan op voor en achternaam zoeken van een andere gebruiker. Dit is nog niet de uiteindelijke versie van de UI. Ook zijn de enige filters op dit moment thuis en op kantoor, we zouden graag van jullie willen horen waar jullie graag meer op willen kunnen filteren.

De UI op de homepagina is wel een beetje aangepast.

Als laatste is de MAC-Adresses pagina nu wel aanwezig, deze kan je vinden onder het settings tabje. Je kan op de + drukken om een nieuwe toe te voegen en je kan op een adres klikken om deze aan te passen of te verwijderen. Op dit moment is dit puur front-end en heeft het nog geen functionaliteit!

We zijn op de hoogte van de volgende problemen
- Zoeken is op dit moment nog hoofdlettergevoelig
- Er verschijnt een warning in de console tijdens het zoeken, we weten waarom het gebeurd we weten alleen nog niet hoe we het moeten oplossen
- De stijl/UI van beide nieuwe onderdelen is nog niet af.
- Je moet perse op de "Send mail" knop drukken om de mail te versturen en je kan niet gewoon op enter drukken
- De kleuren van de yes/no knoppen zijn niet helemaal up to date en kunnen anders lopen dan de huidige status is. 
- Op sommige devices is de UI niet in het midden


## v17 - 15/11/2022
Dit is de versie die wij hebben laten zien tijdens de sprint 2 oplevering.

We zijn op de hoogte van de volgende problemen
- Je moet perse op de "Send mail" knop drukken om de mail te versturen en je kan niet gewoon op enter drukken
- De kleuren van de yes/no knoppen zijn niet helemaal up to date en kunnen anders lopen dan de huidige status is. 
- Op sommige devices is de UI niet in het midden
