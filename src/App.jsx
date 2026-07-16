import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes.jsx';
import { MeetingProvider } from './context/MeetingContext.jsx';

function App() {
  return (
    <BrowserRouter>
      <MeetingProvider>
        <AppRoutes />
      </MeetingProvider>
    </BrowserRouter>
  );
}

export default App;
