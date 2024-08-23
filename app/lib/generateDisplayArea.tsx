import type { Move } from "./moves";
import type { Pokemon } from "./pokemon";
import calculateMaxHP from "./calculateMaxHP";
import { RosterEntry } from "./generatePlayerRoster";

export type DisplayContent = {
  move?: Move;
  rosterEntry?: RosterEntry;
};

export default function generateDisplayArea(
  displayArea?: DisplayContent | null
): React.ReactNode {
  if (displayArea == null) return;
  if (displayArea.move != null) {
    return (
      <div>
        <div>{displayArea.move.name}</div>
        <div className="flex">
          <div
            className={`bg-${displayArea.move.type} w-20 flex justify-center text-white`}
          >
            {displayArea.move.type}
          </div>
          <div className="bg-green-600 mx-4 text-white">
            {displayArea.move.damageCategory}
          </div>
        </div>
        <div className="flex">
          <div>Power: {displayArea.move.power}</div>
          <div className="mx-4">
            Accuracy: {displayArea.move.accuracy * 100}%
          </div>
        </div>
      </div>
    );
  } else if (displayArea.rosterEntry != null) {
    return (
      <div>
        <div>{displayArea.rosterEntry.pokemon.name}</div>
        <div className="flex">
          <div
            className={`bg-${displayArea.rosterEntry.pokemon.types[0]} w-20 flex justify-center text-white`}
          >
            {displayArea.rosterEntry.pokemon.types[0]}
          </div>
          <div
            className={`bg-${displayArea.rosterEntry.pokemon.types[1]} w-20 mx-4 flex justify-center text-white`}
          >
            {displayArea.rosterEntry.pokemon.types[1]}
          </div>
        </div>
        <hr></hr>
        <div>Stats:</div>
        <div>
          HP: {displayArea.rosterEntry.currentHP}/
          {calculateMaxHP(displayArea.rosterEntry.pokemon)}
        </div>
        <div>Attack: {displayArea.rosterEntry.pokemon.stats.atk}</div>
        <div>Defense: {displayArea.rosterEntry.pokemon.stats.def}</div>
        <div>Sp. Attack: {displayArea.rosterEntry.pokemon.stats.spAtk}</div>
        <div>Sp. Defense: {displayArea.rosterEntry.pokemon.stats.spDef}</div>
        <div>Speed: {displayArea.rosterEntry.pokemon.stats.sp}</div>
        <hr></hr>
        <div>Moves:</div>
        <div>{displayArea.rosterEntry.pokemon.moves[0]?.name}</div>
        <div>{displayArea.rosterEntry.pokemon.moves[1]?.name}</div>
        <div>{displayArea.rosterEntry.pokemon.moves[2]?.name}</div>
        <div>{displayArea.rosterEntry.pokemon.moves[3]?.name}</div>
      </div>
    );
  }
}
