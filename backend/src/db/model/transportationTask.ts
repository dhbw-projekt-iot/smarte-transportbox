import mongoose from 'mongoose';
import constraintsSchema from './constraints.js';

const { Schema } = mongoose;

const schema = new mongoose.Schema({
  deviceID: {
    type: Schema.Types.ObjectId,
    ref: 'Device',
    required: false,
  },
  measurements: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Measurement',
    },
  ],
  incidents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Incident',
    },
  ],
  constraints: {
    type: constraintsSchema.schema,
    required: true,
  },
  // Metadata
  productDescription: String,
  productType: String,
  shippingID: String,
  fromLocation: String,
  toLocation: String,
  ownerMail: String,
  createdAt: Date,
  status: String,
});

export default mongoose.model('TransportationTask', schema);
