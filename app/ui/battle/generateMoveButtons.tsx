import type { Pokemon } from "@/app/lib/pokemon";
import { Move } from "@/app/lib/moves";
import { RosterEntry } from "@/app/lib/generatePlayerRoster";

export default function generateMoveButtons(
  activePokemon: RosterEntry | undefined,
  onMouseOver: (item: Move) => void,
  onClick: (item: Move) => void
): React.ReactNode {
  if (activePokemon == undefined) {
    return;
  }
  const placeholderMoves = [];
  for (let i = 0; i < 4 - activePokemon.pokemon.moves.length; i++) {
    placeholderMoves.push(
      <div
        key={`placeholderMoves${i}`}
        className="bg-gray-600 py-2 w-[130px] border border-gray-400 rounded shadow mx-auto my-2 h-[2.6rem]"
      ></div>
    );
  }
  return (
    <div className="bg-gray-200 flex grid grid-cols-2 w-[300px] mx-auto my-2">
      {activePokemon.pokemon.moves.map((item) => (
        <button
          disabled={activePokemon.currentHP == 0}
          key={`${item.name}`}
          className="bg-gray-300 hover:bg-gray-500 text-gray-800 py-2 w-[130px] border border-gray-400 rounded shadow mx-auto my-2 h-[2.6rem] disabled:bg-gray-600"
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
