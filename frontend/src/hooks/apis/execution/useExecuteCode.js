import { executeCode } from '@/apis/execution';
import { useMutation } from '@tanstack/react-query';

export const useExecuteCode = () => {
  const {
    isPending,
    isError,
    isSuccess,
    mutateAsync: codeExecutionMutation,
  } = useMutation({
    mutationFn: executeCode,
  });

  return {
    isPending,
    isError,
    isSuccess,
    codeExecutionMutation,
  };
};
