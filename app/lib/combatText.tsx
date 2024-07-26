import React from "react";
import type { CombatOutcome } from "./damageCalculations";

export default function combatText(
  activePokemon: string,
  opposingPokemon: string,
  pokemonMove: string,
  resultDamage: CombatOutcome
): React.ReactNode {
  if (pokemonMove !== "") {
    if (resultDamage === "Miss") {
      return (
        <p>
          {activePokemon} used {pokemonMove}...but it missed.
        </p>
      );
    } else if (resultDamage === "No effect") {
      return (
        <p>
          {activePokemon} used {pokemonMove}! It had no effect.
        </p>
      );
    } else {
      return (
        <p>
          {activePokemon} used {pokemonMove}! {opposingPokemon} took{" "}
          {resultDamage} damage.
        </p>
      );
    }
  }
}
