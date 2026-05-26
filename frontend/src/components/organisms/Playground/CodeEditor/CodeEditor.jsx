import useUserStore from '@/hooks/store/useUserStore';
import { createYjsProvider } from '@/lib/yjs';
import Editor from '@monaco-editor/react';
import { useEffect, useRef } from 'react';
import { MonacoBinding } from 'y-monaco';
import * as Y from 'yjs';

const CodeEditor = ({
  code,
  setCode,
  setCurrentCode,
  roomId,
  editorRef,
  monacoRef,
}) => {
  const providerRef = useRef(null);
  const awarenessRef = useRef(null);
  const { user } = useUserStore();

  const decorationRef = useRef({
    cursor: {},
    selection: {},
  });

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    monacoRef.current = monaco;

    const { yText, provider } = createYjsProvider(roomId);

    providerRef.current = provider;
    awarenessRef.current = provider.awareness;

    new MonacoBinding(
      yText,
      editor.getModel(),
      new Set([editor]),
      provider.awareness
    );

    provider.awareness.setLocalStateField('user', {
      id: user._id,
      name: user.name,
      color: '#ff0000',
    });

    provider.awareness.on('change', () => {
      const states = provider.awareness.getStates();

      const activeClientIds = new Set([...states.keys()]);

      /*
        REMOVE STALE CURSOR DECORATIONS
      */

      Object.keys(decorationRef.current.cursor).forEach((clientId) => {
        if (!activeClientIds.has(Number(clientId))) {
          const oldDecorations = decorationRef.current.cursor[clientId];

          editorRef.current.deltaDecorations(oldDecorations, []);

          delete decorationRef.current.cursor[clientId];
        }
      });

      /*
        REMOVE STALE SELECTION DECORATIONS
      */

      Object.keys(decorationRef.current.selection).forEach((clientId) => {
        if (!activeClientIds.has(Number(clientId))) {
          const oldDecorations = decorationRef.current.selection[clientId];

          editorRef.current.deltaDecorations(oldDecorations, []);

          delete decorationRef.current.selection[clientId];
        }
      });

      states.forEach((state, clientId) => {
        //skip current user
        if (clientId === provider.doc.clientID) return;

        const editorInstance = editorRef.current;
        const monacoInstance = monacoRef.current;

        if (!editorInstance || !monacoInstance) return;

        const existingCursorDecorations =
          decorationRef.current.cursor[clientId] || [];

        const existingSelectionDecorations =
          decorationRef.current.selection[clientId] || [];

        /*
          -----------------------------
          CURSOR RENDERING
          -----------------------------
        */

        if (!state.cursor) {
          editorInstance.deltaDecorations(existingCursorDecorations, []);

          decorationRef.current.cursor[clientId] = [];
        }

        if (state.cursor) {
          const cursorDecoration = {
            range: new monacoInstance.Range(
              state.cursor.lineNumber,
              state.cursor.column,
              state.cursor.lineNumber,
              state.cursor.column
            ),

            options: {
              beforeContentClassName: 'remote-cursor',

              hoverMessage: {
                value: state.user?.name || 'Anonymous',
              },
            },
          };

          const oldCursorDecorations =
            decorationRef.current.cursor[clientId] || [];

          const newCursorDecorations = editorInstance.deltaDecorations(
            oldCursorDecorations,
            [cursorDecoration]
          );

          decorationRef.current.cursor[clientId] = newCursorDecorations;
        }

        /*
          -----------------------------
          SELECTION RENDERING
          -----------------------------
        */

        if (!state.selection) {
          editorInstance.deltaDecorations(existingSelectionDecorations, []);

          decorationRef.current.selection[clientId] = [];
        }

        if (state.selection) {
          const selection = state.selection;

          //convert relative positions to absolute positions
          const anchor = Y.createAbsolutePositionFromRelativePosition(
            selection.anchor,
            provider.doc
          );

          const head = Y.createAbsolutePositionFromRelativePosition(
            selection.head,
            provider.doc
          );

          if (!anchor || !head) return;

          const model = editorInstance.getModel();

          const start = model.getPositionAt(anchor.index);

          const end = model.getPositionAt(head.index);

          const selectionDecoration = {
            range: new monacoInstance.Range(
              start.lineNumber,
              start.column,
              end.lineNumber,
              end.column
            ),
            options: {
              inlineClassName: 'remote-selection',

              hoverMessage: {
                value: state.user?.name || 'Anonymous',
              },
            },
          };
          const oldSelectionDecorations =
            decorationRef.current.selection[clientId] || [];

          const newSelectionDecorations = editorInstance.deltaDecorations(
            oldSelectionDecorations,
            [selectionDecoration]
          );

          decorationRef.current.selection[clientId] = newSelectionDecorations;
        }
      });
    });

    editor.onDidChangeModelContent(() => {
      const updatedCode = editor.getValue();
      setCurrentCode(updatedCode);
    });

    //listen to cursor movement
    editor.onDidChangeCursorPosition((e) => {
      awarenessRef.current.setLocalStateField('cursor', {
        lineNumber: e.position.lineNumber,
        column: e.position.column,
      });
    });

    editor.onDidChangeCursorSelection((e) => {
      const model = editor.getModel();

      /*
        CONVERT MONACO POSITIONS
        -> ABSOLUTE OFFSETS
      */

      const startOffset = model.getOffsetAt({
        lineNumber: e.selection.startLineNumber,
        column: e.selection.startColumn,
      });

      const endOffset = model.getOffsetAt({
        lineNumber: e.selection.endLineNumber,
        column: e.selection.endColumn,
      });

      /*
    CONVERT ABSOLUTE OFFSETS
    -> YJS RELATIVE POSITIONS
  */

      awarenessRef.current.setLocalStateField('selection', {
        anchor: Y.createRelativePositionFromTypeIndex(yText, startOffset),

        head: Y.createRelativePositionFromTypeIndex(yText, endOffset),
      });
    });
  }

  useEffect(() => {
    return () => {
      awarenessRef.current?.setLocalState(null);

      providerRef.current?.destroy();
    };
  }, []);
  return (
    <Editor
      height="100%"
      defaultLanguage="python"
      theme="vs-dark"
      onMount={handleEditorDidMount}
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        wordWrap: 'on',
        scrollBeyondLastLine: false,
      }}
    />
  );
};

export default CodeEditor;
