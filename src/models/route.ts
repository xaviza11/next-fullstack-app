import { Schema, model, models } from "mongoose";

const OwnerSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

const VotesSchema = new Schema({
  negatives: {
    type: Number,
    default: 0
  },
  positives: {
    type: Number,
    default: 0
  }
});

const UserSchema = new Schema({
  departure: {
    type: String,
    unique: true,
    required: true
  },
  arrival: {
    type: String,
    required: true
  },
  fullRoute: {
    type: String,
    required: true
  },
  placeMarks: {
    type: Map,
    of: String,
    required: true
  },
  owner: OwnerSchema,
  airCraft: {
    type: String,
    required: true
  },
  votes: VotesSchema,
  isPublic: {
    type: Boolean,
    required: true
  }
})


const CustomRoute = models.Routes || model("Route", UserSchema);

export default CustomRoute;
