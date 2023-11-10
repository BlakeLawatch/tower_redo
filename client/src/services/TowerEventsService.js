import { AppState } from "../AppState"
import { TowerEvent } from "../models/TowerEvent"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TowerEventsService{

    async getTowerEvents(){
        const res = await api.get('api/events')
        AppState.towerEvents = res.data.map((pojo) => new TowerEvent(pojo))
        logger.log('got mapped events!', res.data)

    }

   async createEvent(userInfo){
    const res = await api.create(`api/events`)
   }
}

export const towerEventsService = new TowerEventsService()