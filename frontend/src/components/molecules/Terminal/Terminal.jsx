export const Terminal = ({
  output,
  executionError,
  validationError,
  isExecutionPending,
}) => {
  const hasError = executionError || validationError;

  return (
    <div className="h-56 border-t border-[#2a2a2a] bg-[#1e1e1e] text-sm flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#2a2a2a] bg-[#252526]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        <p className="text-gray-300 font-medium">Console</p>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-4 font-mono whitespace-pre-wrap">
        {/* Validation Error */}
        {validationError?.message && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            <p className="text-red-400 font-semibold mb-1">Validation Error</p>

            <p className="text-red-300">{validationError.message}</p>
          </div>
        )}

        {/* Runtime / Compilation Error */}
        {executionError && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
            <p className="text-red-400 font-semibold mb-2">Runtime Error</p>

            <pre className="text-red-300 overflow-x-auto">{executionError}</pre>
          </div>
        )}

        {/* Success Output */}
        {!hasError && output && (
          <div className="text-green-400">
            <pre>{output}</pre>
          </div>
        )}

        {isExecutionPending && <p className="text-gray-500">Running...</p>}

        {/* Empty State */}
        {!hasError && !output && !isExecutionPending && (
          <p className="text-gray-500">Run your code to see output...</p>
        )}
      </div>
    </div>
  );
};
