var express = require('express');
const app = express();
var mongoose = require('mongoose')
var bodyParser = require('body-parser');
var helmet = require('helmet');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(express.static(__dirname))
mongoose.connect("mongodb://localhost:27017/theatreticket");
const movie = mongoose.model('movie',
                                        new mongoose.Schema({
                                          movie_id: Number,
                                          name: String,
                                          date: Date,
                                          genre: String,
                                          Rated: String,
                                          duration: Number,
                                          screen_no: Number,
                                          no_of_seats_booked: Number
                                        })
)
const Theatre = mongoose.model('Theatre',
                                        new mongoose.Schema({
                                          screen_no: Number,
                                          theatre_id: Number,
                                          reservation_type: String
                                        })
)
const seat_reserved = mongoose.model('seat_reserveds',
                                        new mongoose.Schema({
                                          seat_id: Number,
                                          row: String,
                                          reservation_id: String
                                        })
)
const booking_details = mongoose.model('booking_details',
                                        new mongoose.Schema({
                                          mode: String,
                                          no_of_seats: Number,
                                          date: Date,
                                          time: Number,
                                          movie_id: Number,
                                          seat_id: Number,
                                          amount: Number
                                        }));

app.listen(5500, () => {
  console.log("Application started and Listening on port 5000");
})
app.get("/", (req, res) => {
    res.sendFile(__dirname+'/home.html')
});
app.get("/movie",(req, res)=> {
  res.sendFile(__dirname+'/movie.html')
});
app.get("/create",(req,res)=>{
  res.sendFile(__dirname+'/create.html')
})
//app.get()
app.get('/theater', async(req, res) => {
  res.sendFile(__dirname+'/theater_insert.html')
  
})
app.get('/seats_reserved',async(req,res)=>{
  res.sendFile(__dirname+'/seat_reserved.html')
})
app.get('/booking_details',async(req,res)=>{
  res.sendFile(__dirname+'/booking_details.html')
})

app.post('/movie_insert',async(req,res)=>{
      if( movie.insertMany({
        movie_id: req.body.movie_id,
        name: req.body.name,
        date: req.body.date,
         genre: req.body.genre,
         Rated: req.body.Rated,
         duration: req.body.duration,
         screen_no: req.body.screen_no,
         no_of_seats_booked: req.body.no_of_seats_booked
       })){
        return res.send('User ' + req.body.name + ' Added successfully')
       }
  
    })
    app.post('/theatre_insert',async(req,res)=>{
      if( Theatre.insertMany({
        screen_no: req.body.noscreens,
        theatre_id: req.body.ids,
        reservation_type: req.body.rtype
       })){
        return res.send('Screen_no ' + req.body.screen_no + ' Added successfully')
       }
  
    })
    app.post('/seat_reserved',async(req,res)=>{
      if( seat_reserved.insertMany({
        seat_id: req.body.seat_id,
        row: req.body.row,
        reservation_id: req.body.reservation_id
       })){
        return res.send('Seat' + req.body.seat_id + ' Added successfully')
       }
  
    })
    app.post('/booking_details',async(req,res)=>{
      if( booking_details.insertMany({
        mode: req.body.mode,
        no_of_seats: req.body.no_of_seats,
        date: req.body.date,
        movie_id: req.body.movie_id,
        seat_id: req.body.seat_id,
        amount: req.body.amount
       })){
        return res.send('Movie' + req.body.name + ' Added successfully')
       }
  
    })