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
  if (startingPlayerPokemon == null) {
    return;
  }
  const placeholderMoves = [];
  for (let i = 0; i < 4 - activePlayerPokemon.moves.length; i++) {
    placeholderMoves.push(
      <div className="bg-gray-600 py-2 w-[130px] border border-gray-400 rounded shadow mx-auto my-2 h-[2.6rem]"></div>
    );
  }
  const placeholderParty = [];
  for (let i = 0; i < 6 - playerRosterHP.size; i++) {
    placeholderParty.push(
      <div className="bg-gray-600 flex h-28 rounded-md rounded-tl-3xl w-[300px]"></div>
    );
  }

  return (
    <div>
      <div className="flex justify-end">
        <Link
          className="bg-gray-300 hover:bg-gray-500 text-gray-800 px-1 border border-gray-400 rounded shadow"
          href={"/"}
        >
          Reset
        </Link>
      </div>
      <div className="flex bg-green-600 justify-center mt-24 h-[400px]">
        <div className="bg-orange-600 content-center">
          {activePlayerPokemon.name}: {activePlayerHP}
        </div>
        <div className="bg-white relative flex justify-center my-auto w-[500px] h-[400px]">
          <div className="bg-red-600 scale-x-[-2] scale-y-[2] m-auto">
            <Image
              className=""
              src={activePlayerPokemon.animatedSprite}
              alt=""
            />
          </div>
          <div className="bg-blue-600 m-auto scale-[2]">
            <Image
              className=""
              src={activeOpponentPokemon.animatedSprite}
              alt=""
            />
          </div>
          <div className="bg-red-600 absolute text-black bottom-0 h-[4.5rem]">
            {combatText(
              activePlayerPokemon.name,
              activeOpponentPokemon.name,
              activePlayerMove,
              damageDealt
            )}
            {combatText(
              activeOpponentPokemon.name,
              activePlayerPokemon.name,
              activeOpponentMove,
              damageReceived
            )}
            {activePlayerHP <= 0 && <p>{activePlayerPokemon.name} fainted</p>}
          </div>
        </div>
        <div className="bg-orange-600 content-center">
          {activeOpponentPokemon.name}: {activeOpponentHP}
        </div>
      </div>
      <div className="bg-purple-600 flex grid grid-cols-2 w-[300px] mx-auto my-2">
        {activePlayerPokemon.moves.map((item) => (
          <button
            key={`${item}`}
            className="bg-gray-300 hover:bg-gray-500 text-gray-800 py-2 w-[130px] border border-gray-400 rounded shadow mx-auto my-2 h-[2.6rem]"
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
        {placeholderMoves}
      </div>
      <div className="bg-red-600 w-fit flex grid grid-cols-2 gap-4 p-4 mx-auto">
        {Array.from(playerRosterHP.keys()).map((item) => {
          const partyPokemon = playerRosterHP.get(item)?.pokemon;
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
              className="bg-blue-600 flex items-center h-28 rounded-md rounded-tl-3xl w-[300px]"
            >
              <div className="bg-white flex justify-center m-auto w-[100px]">
                <Image src={partyPokemon.staticSprite} alt="" />
              </div>
              <div className="bg-green-600 content-center w-[180px] p-[20px]">
                <span className="flex justify-start">{partyPokemon.name}</span>
                <div className="w-[140px] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className={`bg-orange-600 h-2.5 rounded-full w-[${
                      (partyPokemonHP / calculateMaxHP(partyPokemon)) * 100
                    }%]`}
                  ></div>
                </div>
                <span className="flex justify-end">
                  {partyPokemonHP}/{calculateMaxHP(partyPokemon)}
                </span>
              </div>
            </button>
          );
        })}
        {placeholderParty}
        {/* <div className="bg-blue-600 flex h-28 rounded-md rounded-tl-3xl w-[300px]"></div> */}
      </div>
      <button
        onClick={() => {
          setPlayerRosterHP(
            playerRosterHP.set(activePlayerPokemon.name, {
              pokemon: activePlayerPokemon,
              currentHP: activePlayerHP,
            })
          );
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
        <div className="bg-pink-600">hover over content</div>
        Switch
      </button>
    </div>
  );
}
