import React from 'react' 
import './App.css'; 
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client"; 
import { BrowserRouter, Routes, Route } from "react-router-dom"; 

import Homepage from './pages/Homepage'; 
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { NavbarComp } from './components/Navbar';

const client = new ApolloClient({ 
  uri: "http://localhost:1337/graphql", 
  cache: new InMemoryCache(), 
}); 

function App() { 
  return ( 
    <BrowserRouter> 
      <ApolloProvider client={client}> 
        <Header title="Sea Monsters"/>
        <NavbarComp/>
        <main className='container background'> 
          <Routes> 
            <Route path="/" element={<Homepage />} /> 
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
          </Routes> 
        </main> 
        <Footer copyright={{projectName: "Annual project IT2", authors: "Erik Graf, Eliška Káňová"}} />
      </ApolloProvider> 
    </BrowserRouter> 

  ); 
} 

export default App; 