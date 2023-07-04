import React,{ReactNode} from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import './index.css';
import App from './App';
import { Route, BrowserRouter as Router,Routes } from 'react-router-dom';
import client from './api/client';
import { AuthProvider} from "./context/auth";
import reportWebVitals from './reportWebVitals';
import Login from './pages/Auth/Login';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
  <ApolloProvider client={client}>
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
    </ApolloProvider >
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
