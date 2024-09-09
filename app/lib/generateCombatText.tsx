import combatText from "./combatText";
import { CombatOutcome } from "./damageCalculations";
import { Pokemon } from "./pokemon";

export type combatContent = {
  attacker: Pokemon;
  defender: Pokemon;
  move?: string;
  opponentFaintSwitch?: string;
  outcome: CombatOutcome;
};

export default function generateCombatText(
  combatInfo: Map<number, combatContent>
): React.ReactNode {
  //   if (
  //     activePlayerPokemon == undefined ||
  //     activeOpponentPokemon == undefined ||
  //     theActivePlayerHP == undefined
  //   ) {
  //     return;
  //   }
  const combatInfo1 = combatInfo.get(1);
  const combatInfo2 = combatInfo.get(2);
  if (combatInfo1 == undefined || combatInfo2 == undefined) {
    return;
  }
  return (
    <div className="bg-red-600 absolute text-black bottom-0 h-[4.5rem]">
      {combatText(
        combatInfo1
        // activePlayerPokemon.name,
        // activeOpponentPokemon.name,
        // activePlayerMove,
        // damageDealt
      )}
      {combatText(
        combatInfo2
        // activeOpponentPokemon.name,
        // activePlayerPokemon.name,
        // activeOpponentMove,
        // damageReceived
      )}
      {/* {theActivePlayerHP <= 0 && <p>{activePlayerPokemon.name} fainted</p>} */}
    </div>
  );
}
