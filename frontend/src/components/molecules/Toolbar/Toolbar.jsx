import Button from '@/components/atoms/Homepage/Button/Button';

const EditorToolbar = ({ roomId }) => {
  return (
    <div className="flex justify-between items-center px-4 py-2 bg-[#1e1e1e] border-b border-gray-700 text-gray-200">
      <p className="text-sm">
        Room: <span className="font-medium text-white">{roomId}</span>
      </p>

      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
        Share
      </Button>
    </div>
  );
};

export default EditorToolbar;
