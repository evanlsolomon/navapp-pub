# navapp:
This is a navigation app I am building to learn about routing algorithms, and mapping apps

### Current form in a browser:
![web4](https://github.com/user-attachments/assets/37b6d935-6095-49d6-8138-192837370418)

## and in an iOS simulator:
![ios2](https://github.com/user-attachments/assets/0cd9aaef-8984-4bb4-8415-460163cdd9af)


## Some tools I am learning along the way:
- React (web) and ReactNative with Expo (iOS/android) for component development
- [MabLibreGL JS](https://maplibre.org/) for map style and display
- [Protmaps](https://protomaps.com/) for MVTiles (built upon OpenStreetMap data)
- Mapbox APIs for place suggestions (search)
- [OSRM](https://project-osrm.org/) (Open Source Routing Machine) for generating routes 

## Some areas where I would like to make progress include:
### Security:
- Apply user authentication database + logic. This is so that I can publicly host the app, and actually use it outside my home, while protecting my accounts with the APIs I am using.
- Complete the transition to making all server calls externally. Right now, OSRM is on localhost server
- Query MVTiles from a server I manage.  Currently I am requesting map data from the Protomaps API

### User Experience:
- Add turn by turn directions view.
- Poll user device location and bearing to enable actual navigation.

### Why did I invest time in this?
Maps are (mostly) good, and it's fun to make tools that you can imagine using in your everyday life. 

<img src='./assets/wk5-beer-api-client.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />




**The code has API keys hardcoded inside it, so it's not published. Removing that limitation is high on my to-do list.**
