export class TowerEvent{
    constructor(data){
        this.id = data.id
        this.creatorId = data.creatorId
        this.name = data.name
        this.description = data.description
        this.coverImg = data.coverImg
        this.location = data.location
        this.capacity = data.capacity
        this.startDate = new Date(data.startDate)
        this.isCanceled = data.isCanceled
        this.type = data.type
        this.createdAt = data.createdAt
        this.ticketCount = data.ticketCount
    }
}

const eventModel = 
    {
        "_id": "654a48ed27e6640261d850ae",
        "creatorId": "6541827fc58db642d7c02476",
        "name": "The Funky Harrigntons",
        "description": "Lorem Khaled Ipsum is a major key to success. How’s business? Boomin. The other day the grass was brown, now it’s green because I ain’t give up. Never surrender. To succeed you must believe. When you believe, you will succeed. It’s on you how you want to live your life. Everyone has a choice. I pick my choice, squeaky clean. Lion!",
        "coverImg": "https://images.unsplash.com/photo-1619229667009-e7e51684e8e6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=900&q=60",
        "location": "At The Social Expo Center",
        "capacity": 171,
        "startDate": "2023-11-14T07:00:00.000Z",
        "isCanceled": false,
        "type": "concert",
        "createdAt": "2023-11-07T14:25:49.313Z",
        "updatedAt": "2023-11-07T14:25:49.313Z",
        "__v": 0,
        "ticketCount": 0,
        "id": "654a48ed27e6640261d850ae"
    }
