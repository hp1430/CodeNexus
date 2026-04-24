import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: [true, 'Room ID is required'],
      unique: [true, 'Room ID must be unique'],
      trim: true
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Participant is required']
      }
    ],
    code: {
      type: String,
      default: '// start coding...'
    }
  },
  { timestamps: true }
);

const Room = mongoose.model('Room', roomSchema);
export default Room;
