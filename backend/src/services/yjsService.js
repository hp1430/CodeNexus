import { setPersistence } from 'y-websocket/bin/utils';
import * as Y from 'yjs';

import YjsDocument from '../schema/yjsDocument.js';

export const initializeYjsPersistence = () => {
  setPersistence({
    bindState: async (roomId, ydoc) => {
      try {
        const existingDoc = await YjsDocument.findOne({ roomId });

        if (existingDoc) {
          Y.applyUpdate(ydoc, new Uint8Array(existingDoc.documentState));
        }

        // Listen for updates and persist them
        ydoc.on('update', async () => {
          try {
            const fullState = Y.encodeStateAsUpdate(ydoc);

            await YjsDocument.findOneAndUpdate(
              { roomId },
              {
                roomId,
                documentState: Buffer.from(fullState),
                lastUpdated: new Date()
              },
              {
                upsert: true,
                new: true
              }
            );
          } catch (error) {
            console.error(
              `Failed to persist update for room ${roomId}:`,
              error
            );
          }
        });
      } catch (error) {
        console.error(`[bindState] Critical error for room ${roomId}:`, error);
      }
    },

    writeState: async (roomId, ydoc) => {
      try {
        const state = Y.encodeStateAsUpdate(ydoc);

        await YjsDocument.findOneAndUpdate(
          { roomId },
          {
            roomId,
            documentState: Buffer.from(state),
            lastUpdated: new Date()
          },
          { upsert: true }
        );
      } catch (error) {
        console.error(`[writeState] Failed for room ${roomId}:`, error);
      }
    }
  });
};
