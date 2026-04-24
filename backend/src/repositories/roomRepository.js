import Room from '../schema/room.js';

const roomRepository = {
  getRoomWithParticipants: async (roomId) => {
    const room = await Room.findOne({ roomId })
      .populate('host')
      .populate('participants');
    return room;
  },
  getRoomByRoomId: async (roomId) => {
    const room = await Room.findOne({ roomId });
    return room;
  },
  createRoom: async (roomData) => {
    const room = await Room.create(roomData);
    return room;
  },
  updateRoom: async (roomId, updateData) => {
    const room = await Room.findOneAndUpdate({ roomId }, updateData, {
      new: true
    });
    return room;
  }
};

export default roomRepository;
