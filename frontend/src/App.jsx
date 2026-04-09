import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { HomepageWrapper } from './pages/Homepage/HomepageWrapper';
import { Toaster } from './components/ui/sonner';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HomepageWrapper />
        <Toaster />
      </QueryClientProvider>
    </>
  );
}

export default App;
