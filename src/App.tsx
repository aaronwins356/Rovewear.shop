import React from 'react';
import { Layout } from './components/Layout';
import { AppRoutes } from './routes/AppRoutes';

const App: React.FC = () => (
  <Layout>
    <AppRoutes />
  </Layout>
);

export default App;
