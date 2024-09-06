import type { RosterEntry } from "./generatePlayerRoster";

export default function randomTeamMember(
  roster: Map<string, RosterEntry>
): string {
  const aliveRoster: string[] = [];
  roster.forEach((element) => {
    if (element.currentHP != 0) {
      aliveRoster.push(element.pokemon.name);
    }
  });
  return aliveRoster[Math.floor(Math.random() * aliveRoster.length)];
}
