import React from "react";
import type { CombatOutcome } from "./damageCalculations";
import { combatContent } from "./generateCombatText";

export default function combatText(
  combatContent: combatContent
  // activePokemon: string,
  // opposingPokemon: string,
  // pokemonMove: string,
  // resultDamage: CombatOutcome
): React.ReactNode {
  if (combatContent.outcome === "Miss") {
    return (
      <p>
        {combatContent.attacker.name} used {combatContent.move}...but it missed.
      </p>
    );
  } else if (combatContent.outcome === "No effect") {
    return (
      <p>
        {combatContent.attacker.name} used {combatContent.move}! It had no
        effect.
      </p>
    );
  } else if (combatContent.outcome === "Fainted") {
    return (
      <p>
        {combatContent.attacker.name} fainted. Opponent switched to{" "}
        {combatContent.opponentFaintSwitch}.
      </p>
    );
  } else {
    return (
      <p>
        {combatContent.attacker.name} used {combatContent.move}!{" "}
        {combatContent.defender.name} took {combatContent.outcome} damage.
      </p>
    );
  }
}
