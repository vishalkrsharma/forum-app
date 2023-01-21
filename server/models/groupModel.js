const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  members: {
    type: Array,
  },
  image: {
    type: String,
  },
  posts: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  admin: {
    type: Object,
  },
});

groupSchema.statics.createGroup = async function (name, about, image, userObj) {
  const check = await this.findOne({ name });
  if (check) throw Error('Group Name already exists, Try a different name');
  const group = await this.create({ name: name, about: about, image: image, admin: userObj });
  return group;
};

module.exports = mongoose.model('Group', groupSchema);
