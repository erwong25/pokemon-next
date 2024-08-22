"use client";

import React from "react";
import { useState } from "react";
import { POKEMON_LIST, POKEMONS, Pokemon } from "../lib/pokemon";
import { TACKLE, type Move } from "../lib/moves";
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
  type DisplayContent = {
    move?: Move;
    pokemon?: Pokemon;
  };
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
  const [displayArea, setDisplayArea] = useState<DisplayContent | null>(null);
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
  function generateDisplayArea(
    displayArea?: DisplayContent | null
  ): React.ReactNode {
    if (displayArea == null) return;
    if (displayArea.move != null) {
      return (
        <div>
          <div>{displayArea.move.name}</div>
          <div className="flex">
            <div className="bg-red-600">{displayArea.move.type}</div>
            <div className="bg-green-600 mx-4">
              {displayArea.move.damageCategory}
            </div>
          </div>
          <div className="flex">
            <div>Power: {displayArea.move.power}</div>
            <div className="mx-4">
              Accuracy: {displayArea.move.accuracy * 100}%
            </div>
          </div>
        </div>
      );
    } else if (displayArea.pokemon != null) {
      return (
        <div>
          <div>{displayArea.pokemon.name}</div>
          <div className="flex">
            <div>{displayArea.pokemon.types[0]}</div>
            <div className="mx-4">{displayArea.pokemon.types[1]}</div>
          </div>
          <hr></hr>
          <div>Stats:</div>
          <div>HP: {calculateMaxHP(displayArea.pokemon)}</div>
          <div>Attack: {displayArea.pokemon.stats.atk}</div>
          <div>Defense: {displayArea.pokemon.stats.def}</div>
          <div>Sp. Attack: {displayArea.pokemon.stats.spAtk}</div>
          <div>Sp. Defense: {displayArea.pokemon.stats.spDef}</div>
          <div>Speed: {displayArea.pokemon.stats.sp}</div>
          <hr></hr>
          <div>Moves:</div>
          <div>{displayArea.pokemon.moves[0]?.name}</div>
          <div>{displayArea.pokemon.moves[1]?.name}</div>
          <div>{displayArea.pokemon.moves[2]?.name}</div>
          <div>{displayArea.pokemon.moves[3]?.name}</div>
        </div>
      );
    }
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
      <div className="flex bg-yellow-600 justify-center">
        <div className="bg-pink-600 w-[650px] mr-1">
          <div className="absolute">Select Move:</div>
          <div className="bg-purple-600 flex grid grid-cols-2 w-[300px] mx-auto my-2">
            {activePlayerPokemon.moves.map((item) => (
              <button
                key={`${item}`}
                className="bg-gray-300 hover:bg-gray-500 text-gray-800 py-2 w-[130px] border border-gray-400 rounded shadow mx-auto my-2 h-[2.6rem]"
                onMouseOver={() => setDisplayArea({ move: item })}
                onMouseOut={() => setDisplayArea({})}
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
          <div className="">Switch:</div>
          <div className="bg-red-600 w-fit flex grid grid-cols-2 gap-4 p-4 pt-0 mx-auto">
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
                  onMouseOver={() => setDisplayArea({ pokemon: partyPokemon })}
                  onMouseOut={() => setDisplayArea(null)}
                  className="bg-blue-600 flex items-center h-28 rounded-md rounded-tl-3xl w-[300px]"
                >
                  <div className="bg-white flex justify-center m-auto w-[100px]">
                    <Image src={partyPokemon.staticSprite} alt="" />
                  </div>
                  <div className="bg-green-600 content-center w-[180px] p-[20px]">
                    <span className="flex justify-start">
                      {partyPokemon.name}
                    </span>
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
        </div>
        <div className="bg-blue-600 ml-1 my-2 w-[650px] rounded-xl py-4 px-6">
          {generateDisplayArea(displayArea)}
        </div>
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
        Switch
      </button>
    </div>
  );
}
