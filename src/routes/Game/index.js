
import { Router } from "express";
import { getGames, setGame } from "../../controllers/Game/index.js";

const gameRouter = Router()

gameRouter.get('/games', getGames)
gameRouter.post('/games', setGame)

export {gameRouter}