export class Ticket{
    constructor(data){
        this.id = data.id
        this.eventId = data.eventId
        this.accountId = data.accountId
        this.event = data.event
        this.createdAt = data.createdAt
        this.updatedAt = data.updatedAt
        this.profile = data.profile
    }
}

const ticket = {
    "eventId": "654a4d29f28cb53e2ac9a488",
    "accountId": "6541827fc58db642d7c02476",
    "_id": "65577750a78b591bfeb6782c",
    "createdAt": "2023-11-17T14:23:12.510Z",
    "updatedAt": "2023-11-17T14:23:12.510Z",
    "__v": 0,
    "profile": {
        "_id": "6541827fc58db642d7c02476",
        "subs": [
            "auth0|6541827f39444cc3fe9a23a7"
        ],
        "email": "anothernewemail@new.email",
        "name": "anothernewemail",
        "picture": "https://s.gravatar.com/avatar/87d93fa56cfb84f69fde33613bc552ea?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fan.png",
        "createdAt": "2023-10-31T22:46:30.754Z",
        "updatedAt": "2023-10-31T22:46:30.754Z",
        "__v": 0,
        "id": "6541827fc58db642d7c02476"
    },
    "id": "65577750a78b591bfeb6782c"
}