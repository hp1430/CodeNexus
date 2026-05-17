export const createPeerConnection = ({
  localStream,
  socketId,
  onIceCandidate,
}) => {
  const peerConnection = new RTCPeerConnection({
    iceServers: [
      {
        urls: import.meta.env.VITE_STUN_SERVER_URL,
      },
    ],
  });

  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      onIceCandidate(socketId, event.candidate);
    }
  };

  return peerConnection;
};
