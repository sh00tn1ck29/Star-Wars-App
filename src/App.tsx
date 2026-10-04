import { useState } from 'react';
import type { Character } from './entities/character/types/index';
import { Header } from './components/Header/index';
import { Footer } from './components/Footer/index';
import { CharacterList } from './components/CharacterList/index';
import { CharacterGraph } from './components/CharacterGraph/index';
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
