import { Schema, model, models } from "mongoose"
import {UsersSchema, FlightRoutesSchema} from './schemas/index'
import mongoose from "mongoose"

const Users = mongoose.models?.Users || mongoose.model('Users', UsersSchema)
const FlightRoutes = mongoose.models?.FlightRoutes || model('FlightRoutes', FlightRoutesSchema)

export {Users, FlightRoutes}