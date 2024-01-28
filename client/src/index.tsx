import React from 'react'
import ReactDOM from 'react-dom/client'
import '../src/App/layout/styles.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/Routes.tsx';

// Sau khi thêm router vào -> cần phải đổi mặc định của web khi mới vào sang reactProvider

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
