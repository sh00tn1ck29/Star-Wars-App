import { useState } from 'react';
import type { Character } from './types/character';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { CharacterList } from './components/CharacterList/CharacterList';
import { CharacterGraph } from './components/CharacterGraph/CharacterGraph';
import './App.scss';

export default function App() {
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  return (
    <div className="app">
      <Header />
      <main id="main-content" className="page-content" aria-label="Star Wars universe">
        <div className="page-content__inner">
          <CharacterList selectedCharacter={selectedCharacter} onCharacterSelect={setSelectedCharacter} />
          <CharacterGraph character={selectedCharacter} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
