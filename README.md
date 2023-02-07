# Pets API

This API will allow the users of our react front end application to CRUD events and activities. 

This application uses token authentication instead of sessions. 

## Resources

### Pets

### Users

###### Routes Table
| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| GET   | `/events`             | `events#index`    |
| GET   | `/events/:id`             | `events#show`    |
| POST  | `/events` | `events#create`  |
| PATCH | `/events/:id`        | `events#update`   |
| DELETE | `/events/:id`        | `events#delete`   |

### Toys

###### Routes Table
| Verb   | URI Pattern            | Controller#Action |
|--------|------------------------|-------------------|
| POST  | `/activities` | `activities#create`  |
| PATCH | `/activities/:eventId/:activityId`        | `activities#update`   |
| DELETE | `/activities/:eventId/:activityId`        | `activities#delete`   |