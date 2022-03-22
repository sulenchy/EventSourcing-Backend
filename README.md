# EventSourcing Backend
A solution that allow people to easily discover events that match their interests.

## Project Setup

* Clone the Project
* install the dependencies - `npm install`
* start the app: `npm run dev`

See the hosted app at https://event-sourcing-app.herokuapp.com

## API Endpoints
| Endpoint | path | Payload Example |
| :---         |     :---:      |          ---: |
| Create new user   | POST https://event-sourcing-app.herokuapp.com/register     |  |
| Login     | POST https://event-sourcing-app.herokuapp.com/login      |  |
| Create topic     |  POST https://event-sourcing-app.herokuapp.com/topic/new       |     |
| Update topic     | PUT https://event-sourcing-app.herokuapp.com/topic/:title        |       |
| Read topic     | GET https://event-sourcing-app.herokuapp.com/topic/:title       |       |
| Delete topic     | DELETE https://event-sourcing-app.herokuapp.com/topic/:title         |      |
| Create Event     | POST https://event-sourcing-app.herokuapp.com/event/new         |     |
| Update Event     | PUT https://event-sourcing-app.herokuapp.com/event/:id        |       |
| Read Event     | GET https://event-sourcing-app.herokuapp.com/event/:id       |       |
| Read Events     | GET https://event-sourcing-app.herokuapp.com/events         |      |
| Read Events by topic     | GET https://event-sourcing-app.herokuapp.com/events?topic=1         |       |
| Delete Event     | DELETE https://event-sourcing-app.herokuapp.com/event/:id         |      |

## Contributing

- Nodejs
- mongoose
- express
- jsonwebtoken

## License

MIT