import calculateMaxHP from "@/app/lib/calculateMaxHP";
import { RosterEntry } from "@/app/lib/generatePlayerRoster";
import Image from "next/image";

export default function generatePartyButtons(
  playerRosterHP: Map<string, RosterEntry>,
  onMouseOver: (partyPokemon: RosterEntry) => void
): React.ReactNode {
  return Array.from(playerRosterHP.keys()).map((item) => {
    const partyPokemon = playerRosterHP.get(item);
    if (partyPokemon == null) {
      return null;
    }
    const partyPokemonHP = playerRosterHP.get(item)?.currentHP;
    if (partyPokemonHP == null) {
      return null;
    }
    return (
      <button
        key={`${item}`}
        onMouseOver={() => onMouseOver(partyPokemon)}
        //   onMouseOver={() => setDisplayArea({ rosterEntry: partyPokemon })}
        // onMouseOut={() => setDisplayArea(null)}
        className="bg-blue-600 flex items-center h-28 rounded-md rounded-tl-3xl w-[300px]"
      >
        <div className="bg-white flex justify-center m-auto w-[100px]">
          <Image src={partyPokemon.pokemon.staticSprite} alt="" />
        </div>
        <div className="bg-green-600 content-center w-[180px] p-[20px]">
          <span className="flex justify-start">
            {partyPokemon.pokemon.name}
          </span>
          <div className="w-[140px] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className={`bg-orange-600 h-2.5 rounded-full w-[${
                (partyPokemonHP / calculateMaxHP(partyPokemon.pokemon)) * 100
              }%]`}
            ></div>
          </div>
          <span className="flex justify-end">
            {partyPokemonHP}/{calculateMaxHP(partyPokemon.pokemon)}
          </span>
        </div>
      </button>
    );
  });
}
