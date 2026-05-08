import mongoose from 'mongoose';

const yjsDocumentSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true
    },

    documentState: {
      type: Buffer,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const YjsDocument = mongoose.model('YjsDocument', yjsDocumentSchema);

export default YjsDocument;
