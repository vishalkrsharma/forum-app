require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

//Routes
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const groupRoutes = require('./routes/group');

//app
const app = express();

//database connect
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connected!!'))
  .catch((err) => console.log('DB CONNECTION ERROR', err));

//middleware
app.use(morgan('dev'));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

//routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/group', groupRoutes);

app.listen(process.env.PORT, () => {
  console.log('listening on port 8000!!');
});
