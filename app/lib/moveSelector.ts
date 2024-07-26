import type { Pokemon } from "./pokemon";

export default function moveSelector(activeOpponentPokemon: Pokemon): number {
  return Math.floor(Math.random() * activeOpponentPokemon.moves.length);
}
