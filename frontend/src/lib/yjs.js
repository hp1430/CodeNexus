import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

export const createYjsProvider = (roomId) => {
  // shared document
  const ydoc = new Y.Doc();

  // websocket provider
  const provider = new WebsocketProvider(
    import.meta.env.VITE_YJS_WEBSOCKET_URL,
    roomId,
    ydoc
  );

  // shared text
  const yText = ydoc.getText('monaco');

  return {
    ydoc,
    provider,
    yText,
  };
};
