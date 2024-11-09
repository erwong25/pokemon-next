import React from "react";
import type { CombatOutcome } from "./damageCalculations";
import { combatContent } from "./generateCombatText";

export default function combatText(
  combatContent: combatContent
): React.ReactNode {
  let faintText = null;
  if (combatContent.fainting == "player") {
    faintText = (
      <p>{combatContent.defender.name} fainted. Send out your next pokemon. </p>
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
  if (combatContent.outcome === "Switching") {
    return <p>Switching to {combatContent.attacker.name}.</p>;
  }
  if (combatContent.outcome === "Fainted") {
    return <p>You sent out {combatContent.attacker.name}!</p>;
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
      <div>
        <p>
          {combatContent.attacker.name} used {combatContent.move}!{" "}
          {combatContent.defender.name} took {combatContent.outcome} damage.
        </p>
        {faintText}
      </div>
    );
  }
}
