import { useReducer } from 'react';
import { gameReducer, initialState } from './gameReducer';

export default function App() {
  const [_state, _dispatch] = useReducer(gameReducer, initialState);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
      <p className="text-2xl font-bold tracking-widest uppercase">Verdict</p>
    </div>
  );
}

