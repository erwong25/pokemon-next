import React from "react";
import type { CombatOutcome } from "./damageCalculations";
import { combatContent } from "./generateCombatText";

export default function combatText(
  combatContent: combatContent
): React.ReactNode {
  let faintText = null;
  if (combatContent.fainting == "player") {
    faintText = (
      <p>{combatContent.defender.name} fainted. Send out your next pokemon.</p>
    );
  }
  if (combatContent.fainting == "opponent") {
    faintText = (
      <p>
        {combatContent.defender.name} fainted. Opponent switched to{" "}
        {combatContent.opponentFaintSwitch}.
      </p>
    );
  }
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
  } else {
    return (
      <p>
        {combatContent.attacker.name} used {combatContent.move}!{" "}
        {combatContent.defender.name} took {combatContent.outcome} damage.
        {faintText}
      </p>
    );
  }
}
