const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/OnlineLibrary', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});