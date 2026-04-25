import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, setCode }) => {
  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      theme="vs-dark"
      value={code}
      onChange={(value) => setCode(value || '')}
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
