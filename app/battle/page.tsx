"use client";

import React from "react";
import { useState } from "react";
import { POKEMON_LIST, POKEMONS } from "../lib/pokemon";
import type { CombatOutcome } from "../lib/damageCalculations";
import Image from "next/image";
import calculateMaxHP from "../lib/calculateMaxHP";
import generatePlayerRoster from "../lib/generatePlayerRoster";
import combatText from "../lib/combatText";
import moveSelector from "../lib/moveSelector";
import computeDamage from "../lib/damageCalculations";
import Link from "next/link";

export default function Page({
  searchParams,
}: {
  searchParams: { roster: string };
}) {
  const rawRoster = searchParams.roster.split(",");
  const roster = rawRoster.filter((pokemon) =>
    Object.keys(POKEMONS).includes(pokemon)
  ) as Array<keyof POKEMON_LIST>;
  const startingPlayerPokemon = roster[0];
  if (startingPlayerPokemon == null) {
    return;
  }
  const startingOpponentPokemon = Object.keys(POKEMONS)[
    Math.floor(Math.random() * Object.keys(POKEMONS).length)
  ] as keyof POKEMON_LIST;
  const [activePlayerPokemon, setActivePlayerPokemon] = useState(
    POKEMONS[startingPlayerPokemon]
  );
  const [activeOpponentPokemon, setActiveOpponentPokemon] = useState(
    POKEMONS[startingOpponentPokemon]
  );
  const [damageDealt, setDamageDealt] = useState<CombatOutcome>(0);
  const [damageReceived, setDamageReceived] = useState<CombatOutcome>(0);
  const [activePlayerHP, setActivePlayerHP] = useState(
    calculateMaxHP(POKEMONS[startingPlayerPokemon])
  );
  const [activeOpponentHP, setActiveOpponentHP] = useState(
    calculateMaxHP(POKEMONS[startingOpponentPokemon])
  );
  const [activePlayerMove, setActivePlayerMove] = useState("");
  const [activeOpponentMove, setActiveOpponentMove] = useState("");
  const [playerRosterHP, setPlayerRosterHP] = useState(
    generatePlayerRoster(roster)
  );
  const [opponentRosterHP, setOpponentRosterHP] = useState(""); // not implemented at all yet

  return (
    <div>
      <Image src={activePlayerPokemon.animatedSprite} alt="" />
      <Image src={activeOpponentPokemon.animatedSprite} alt="" />
      <p>
        {activePlayerPokemon.name}: {activePlayerHP}
      </p>
      <p>
        {activeOpponentPokemon.name}: {activeOpponentHP}
      </p>
      {combatText(
        activePlayerPokemon.name,
        activePlayerPokemon.name,
        activePlayerMove,
        damageDealt
      )}
      {combatText(
        activeOpponentPokemon.name,
        activeOpponentPokemon.name,
        activeOpponentMove,
        damageReceived
      )}
      {activePlayerHP <= 0 && <p>{activePlayerPokemon.name} fainted</p>}
      <p>
        {activePlayerPokemon.moves.map((item) => (
          <button
            onClick={() => {
              const opponentMove =
                activeOpponentPokemon.moves[
                  moveSelector(activeOpponentPokemon)
                ];
              setActiveOpponentMove(opponentMove.name);
              setActivePlayerMove(item.name);
              const attackDamage = computeDamage(
                item,
                activePlayerPokemon,
                activeOpponentPokemon
              );
              if (attackDamage === "Miss") {
                setDamageDealt("Miss");
              } else if (attackDamage === "No effect") {
                setDamageDealt("No effect");
              } else {
                setDamageDealt(attackDamage);
                setActiveOpponentHP(activeOpponentHP - attackDamage);
                if (activeOpponentHP - attackDamage <= 0) {
                  setActiveOpponentPokemon(POKEMONS.ARTICUNO);
                }
              }
              const opponentDamage = computeDamage(
                opponentMove,
                activeOpponentPokemon,
                activePlayerPokemon
              );
              if (opponentDamage === "Miss") {
                setDamageReceived("Miss");
              } else if (opponentDamage === "No effect") {
                setDamageReceived("No effect");
              } else {
                setDamageReceived(opponentDamage);
                setActivePlayerHP(activePlayerHP - opponentDamage);
              }
            }}
          >
            {item.name}
          </button>
        ))}
        {
          <button
            onClick={() => {
              setActivePlayerPokemon(POKEMONS.GENGAR);
              if (!playerRosterHP.has(POKEMONS.GENGAR.name)) {
                setPlayerRosterHP(
                  playerRosterHP.set("pokemon", {
                    pokemon: POKEMONS.GENGAR,
                    currentHP: calculateMaxHP(POKEMONS.GENGAR),
                  })
                );
              }
            }}
          >
            Switch
          </button>
        }
      </p>
      <Link href={"/"}>Reset</Link>
    </div>
  );
}
