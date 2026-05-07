import useUserStore from '@/hooks/store/useUserStore';
import { createYjsProvider } from '@/lib/yjs';
import Editor from '@monaco-editor/react';
import { useRef } from 'react';
import { MonacoBinding } from 'y-monaco';

const CodeEditor = ({ code, setCode, roomId, editorRef, monacoRef }) => {
  const providerRef = useRef(null);
  const awarenessRef = useRef(null);
  const { user } = useUserStore();

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

      states.forEach((state, clientId) => {
        //skip current user
        if (clientId === provider.doc.clientID) return;
        console.log('Remote awareness state:', state);
      });
    });

    //listen to cursor movement
    editor.onDidChangeCursorPosition((e) => {
      awarenessRef.current.setLocalStateField('cursor', {
        lineNumber: e.position.lineNumber,
        column: e.position.column,
      });
    });

    editor.onDidChangeCursorPosition((e) => {
      const selection = e.selection;

      awarenessRef.current.setLocalStateField('selection', {
        startLineNumber: selection.startLineNumber,
        startColumn: selection.startColumn,
        endLineNumber: selection.endLineNumber,
        endColumn: selection.endColumn,
      });
    });
  }
  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
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
