import { Schema, model, models } from "mongoose";

const OwnerSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
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

const FlightRoutesSchema = new Schema({
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
    type: Schema.Types.Mixed,
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

export default FlightRoutesSchema;
