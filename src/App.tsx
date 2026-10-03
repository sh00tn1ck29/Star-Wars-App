import './App.scss';
import { Header } from './components/Header/Header';

export default function App() {
  return (
    <>
      <Header />
      <main id="main-content" className="page-content" aria-label="Star Wars universe" />
    </>
  );
}


