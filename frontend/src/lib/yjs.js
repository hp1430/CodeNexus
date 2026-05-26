import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

export const createYjsProvider = (roomId) => {
  console.log('Creating YJS Provider...');
  console.log('Room ID:', roomId);
  console.log('YJS WS URL:', import.meta.env.VITE_YJS_WEBSOCKET_URL);

  // shared document
  const ydoc = new Y.Doc();

  // websocket provider
  const provider = new WebsocketProvider(
    import.meta.env.VITE_YJS_WEBSOCKET_URL,
    roomId,
    ydoc
  );

  console.log('Provider instance created');

  // provider events
  provider.on('status', (event) => {
    console.log('YJS STATUS:', event.status);
  });

  provider.on('connection-close', (event) => {
    console.log('YJS CONNECTION CLOSED:', event);
  });

  provider.on('connection-error', (event) => {
    console.log('YJS CONNECTION ERROR:', event);
  });

  provider.on('sync', (isSynced) => {
    console.log('YJS SYNC STATUS:', isSynced);
  });

  // shared text
  const yText = ydoc.getText('monaco');

  return {
    ydoc,
    provider,
    yText,
  };
};
