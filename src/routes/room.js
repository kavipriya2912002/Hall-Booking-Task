import express from "express";
import roomController from "../controller/room.js"

const router = express.Router()

router.get('/', roomController.BookedRooms)
router.get('/customer', roomController.allCustomer)
router.post('/',roomController.CreateRoom)
router.delete('/:id', roomController.DeleteRoom)
router.put('/:id', roomController.Booking)

export default router