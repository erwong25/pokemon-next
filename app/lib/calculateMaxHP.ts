import type { Pokemon } from "./pokemon";

export default function calculateMaxHP(pokemon: Pokemon): number {
  return pokemon.stats.maxHp * 2 + 110;
}
