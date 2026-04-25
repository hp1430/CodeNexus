import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import { HomepageWrapper } from './pages/Homepage/HomepageWrapper';
import { Toaster } from './components/ui/sonner';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PlaygroundContainer } from './pages/Playground/PlaygroundContainer';
import { ProtectedRoutes } from './routes/ProtectedRoutes';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<HomepageWrapper />} />
            <Route
              path="/playground/:roomId"
              element={
                <ProtectedRoutes>
                  <PlaygroundContainer />
                </ProtectedRoutes>
              }
            />
          </Routes>
          <Toaster />
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
