import { setPersistence } from 'y-websocket/bin/utils';
import * as Y from 'yjs';

import YjsDocument from '../schema/yjsDocument.js';

const saveTimers = new Map();

const persistDocument = async (roomId, ydoc) => {
  try {
    const state = Y.encodeStateAsUpdate(ydoc);

    await YjsDocument.findOneAndUpdate(
      { roomId },

      {
        roomId,

        documentState: Buffer.from(state),

        lastUpdated: new Date()
      },

      {
        upsert: true
      }
    );
  } catch (error) {
    console.error(`Persistence failed for room ${roomId}:`, error);
  }
};

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
          if (saveTimers.has(roomId)) {
            clearTimeout(saveTimers.get(roomId));
          }

          const timer = setTimeout(async () => {
            await persistDocument(roomId, ydoc);
          }, 2000);

          saveTimers.set(roomId, timer);
        });
      } catch (error) {
        console.error(`[bindState] Critical error for room ${roomId}:`, error);
      }
    },

    writeState: async (roomId, ydoc) => {
      await persistDocument(roomId, ydoc);
    }
  });
};
