import { findIndex } from "../common/findIndex.js";


const Rooms = [
  { 
    room_id:1,       
    room_name : "Disney",
    booking_status:true,
    customer_name:"Kavi",
    booking_date:"29-01-2024",
    start_time:"6am",
    end_time:"6pm",
},
{      
  room_id:2,  
    room_name : "Greeny",
    booking_status:true,
    customer_name:"Priya",
    booking_date:"24-01-2024",
    start_time:"7am",
    end_time:"7pm",
},
]


const Customer = [
  {        
    room_id:1,
    customer_id:1,
    room_name : "Disney", 
    customer_name:"Kavi",
    booking_date:"29-01-2024",
    start_time:"6am",
    end_time:"6pm",
},
{        
  room_id:2,
    customer_id:2,
    room_name : "Greeny",    
    customer_name:"Priya",
    booking_date:"24-01-2024",
    start_time:"7am",
    end_time:"7pm",
},
  
]


const BookedRooms = (req, res) => {
  try {
    let BookedRoom = [];
    for (let i = 0; i < Rooms.length; i++) {
      for (let y = 0; y < Customer.length; y++) {
        if (Rooms[i].room_id === Customer[y].room_id) {
          BookedRoom.push({
            Room_Name: Rooms[i].room_name,
            Booked_Status: Rooms[i].booked_status,
            customer: Customer[y],
          })
        }
      }
      if (Rooms[i].booked_status === false) {
        BookedRoom.push(Rooms[i])
      }
    }
    res.status(200).send(BookedRoom)
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    })
  }
}


const allCustomer = (req, res) => {
  try {
    let BookedRoom = [];

    for (let i = 0; i < Rooms.length; i++) {
      for (let y = 0; y < Customer.length; y++) {
        if (Rooms[i].room_id === Customer[y].room_id) {
          BookedRoom.push({
            Customer: Customer[y].name,
            Room_Name: Rooms[i].room_name,
            Date: Customer[y].date,
            Start_Time: Customer[y].start_time,
            End_Tiem: Customer[y].end_time,
            Booked_Status: Rooms[i].booked_status,
          });
        }
      }
    }
    res.status(200).send(BookedRoom);
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    })
  }
}


const CreateRoom = (req, res) => {
  try {
    const id = Rooms.length ? Rooms[Rooms.length - 1].room_id + 1 : 1;
    req.body.room_id = id;
    req.body.room_name = `room-${id}`;
    req.body.booked_status = false;

    Rooms.push(req.body);
    console.log(req.body);
    res.status(200).send({
      message: "Room Added Successfully",
    })
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    })
  }
}


const DeleteRoom = (req, res) => {
  try {
    const { id } = req.params;
    const index = findIndex(Rooms, id);
    if (index !== -1) {
      console.log("if two");
      Rooms.splice(index, 1);
      res.status(200).send({
        message: "Room Deleted Successfully",
      });
    } else {
      res.status(400).send({
        message: "Invalid Room Id",
      })
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    })
  }
}


const Booking = (req, res) => {
  try {
    const { id } = req.params;
    const Room_id = +id
    const index = findIndex(Rooms, id);
    const temp = {...Rooms[index]}
    temp.booked_status = true
    
    if (index !== -1 && Rooms[index].booked_status == false) {
      Rooms.splice(index,1,temp) // Room status changeing
         const {name, date, start_time, end_time} = req.body
      const id = Customer.length? Customer[Customer.length -1].customer_id + 1 : 1;
      const newCustomer = {
        customer_id : id,
        name, 
        date,
        start_time,
        end_time,
        room_id : Room_id
      }
      Customer.push(newCustomer)
      res.status(200).send({
        message: "Room Booking Successfully",
      })
    } else if (Rooms[index].booked_status == true) {
      res.status(500).send({
        messag: "This Room is already booking",
      })
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    })
  }
}


export default { 
  BookedRooms, 
  allCustomer, 
  CreateRoom, 
  DeleteRoom, 
  Booking 
}
