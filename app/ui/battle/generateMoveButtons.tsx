import type { Pokemon } from "@/app/lib/pokemon";
import { Move } from "@/app/lib/moves";

export default function generateMoveButtons(
  activePlayerPokemon: Pokemon,
  onMouseOver: (item: Move) => void,
  onClick: (item: Move) => void
): React.ReactNode {
  const placeholderMoves = [];
  for (let i = 0; i < 4 - activePlayerPokemon.moves.length; i++) {
    placeholderMoves.push(
      <div className="bg-gray-600 py-2 w-[130px] border border-gray-400 rounded shadow mx-auto my-2 h-[2.6rem]"></div>
    );
  }
  return (
    <div className="bg-gray-200 flex grid grid-cols-2 w-[300px] mx-auto my-2">
      {activePlayerPokemon.moves.map((item) => (
        <button
          key={`${item}`}
          className="bg-gray-300 hover:bg-gray-500 text-gray-800 py-2 w-[130px] border border-gray-400 rounded shadow mx-auto my-2 h-[2.6rem]"
          onMouseOver={() => onMouseOver(item)}
          //   onMouseOver={() => setDisplayArea({ move: item })}
          // onMouseOut={() => setDisplayArea({})}
          onClick={() => onClick(item)}
        >
          {item.name}
        </button>
      ))}
      {placeholderMoves}
    </div>
  );
}
