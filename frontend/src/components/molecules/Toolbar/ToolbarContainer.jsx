import EditorToolbar from './Toolbar';

export const ToolbarContainer = ({
  roomId,
  onRunClick,
  isExecutionPending,
}) => {
  return (
    <EditorToolbar
      roomId={roomId}
      onRunClick={onRunClick}
      isExecutionPending={isExecutionPending}
    />
  );
};
