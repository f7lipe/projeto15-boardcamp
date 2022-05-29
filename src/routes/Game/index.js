
import { Router } from "express";
import { getGames } from "../../controllers/Game";

const gameRouter = Router()

gameRouter.get('/games', getGames)

export {gameRouter}