export class Comment{
    constructor(data){
        this.id = data.id
        this.creatorId = data.creatorId
        this.eventId = data.eventId
        this.body = data.body
        this.createdAt = data.createdAt
        this.updatedAt = data.updatedAt
        this.creator = data.creator
    }
}

const comment = [
    {
        "_id": "6554403fd753d20ddc253605",
        "creatorId": "6541827fc58db642d7c02476",
        "eventId": "6554403fd753d20ddc253600",
        "body": "This was such a good event.  I can’t wait to attend the next.",
        "createdAt": "2023-11-15T03:51:27.481Z",
        "updatedAt": "2023-11-15T03:51:27.481Z",
        "__v": 0,
        "creator": {
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
        "id": "6554403fd753d20ddc253605"
    }
]