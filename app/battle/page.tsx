"use client";

import React from "react";
import { useState } from "react";
import { POKEMON_LIST, POKEMONS, Pokemon } from "../lib/pokemon";
import type { CombatOutcome } from "../lib/damageCalculations";
import type { Move } from "../lib/moves";
import Image from "next/image";
import calculateMaxHP from "../lib/calculateMaxHP";
import generatePlayerRoster, { RosterEntry } from "../lib/generatePlayerRoster";
import combatText from "../lib/combatText";
import Link from "next/link";
import generateDisplayArea from "../lib/generateDisplayArea";
import type { DisplayContent } from "../lib/generateDisplayArea";
import generatePartyButtons from "../ui/battle/generatePartyButtons";
import generateMoveButtons from "../ui/battle/generateMoveButtons";
import moveSelector from "../lib/moveSelector";
import computeDamage from "../lib/damageCalculations";

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
  const [playerRoster, setPlayerRoster] = useState(
    generatePlayerRoster(roster)
  );
  const [opponentRosterHP, setOpponentRosterHP] = useState(""); // not implemented at all yet
  const [displayArea, setDisplayArea] = useState<DisplayContent | null>(null);
  if (startingPlayerPokemon == null) {
    return;
  }

  const theActivePlayerHP = playerRoster.get(
    activePlayerPokemon.name
  )?.currentHP;
  if (theActivePlayerHP == undefined) {
    return;
  }

  function handleMoveOnClick(item: Move) {
    const opponentMove =
      activeOpponentPokemon.moves[moveSelector(activeOpponentPokemon)];
    setActiveOpponentMove(opponentMove.name);
    setActivePlayerMove(item.name);
    const attackDamage = computeDamage(
      item,
      activePlayerPokemon,
      activeOpponentPokemon
    );
    if (theActivePlayerHP == undefined) {
      return;
    }
    if (attackDamage === "Miss") {
      setDamageDealt("Miss");
    } else if (attackDamage === "No effect") {
      setDamageDealt("No effect");
    } else {
      setDamageDealt(attackDamage);
      if (activeOpponentHP - attackDamage <= 0) {
        setActiveOpponentHP(0);
        setActiveOpponentPokemon(POKEMONS.ARTICUNO);
      } else {
        setActiveOpponentHP(activeOpponentHP - attackDamage);
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
      if (theActivePlayerHP - opponentDamage <= 0) {
        setPlayerRoster(
          playerRoster.set(activePlayerPokemon.name, {
            pokemon: activePlayerPokemon,
            currentHP: 0,
          })
        );
      } else {
        setPlayerRoster(
          playerRoster.set(activePlayerPokemon.name, {
            pokemon: activePlayerPokemon,
            currentHP: theActivePlayerHP - opponentDamage,
          })
        );
      }
    }
  }

  function handlePartyOnClick(item: string) {
    setActivePlayerPokemon(POKEMONS.item);
  }

  return (
    <div>
      <div className="flex bg-green-600 justify-center h-[400px]">
        <div className="bg-orange-600 content-center">
          <span className="flex justify-start">{activePlayerPokemon.name}</span>
          <div className="w-[140px] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              style={{
                width: `${
                  (theActivePlayerHP / calculateMaxHP(activePlayerPokemon)) *
                  100
                }%`,
              }}
              className={`bg-green-600 h-2.5 rounded-full`}
            ></div>
          </div>
          <span className="flex justify-end">
            {theActivePlayerHP}/{calculateMaxHP(activePlayerPokemon)}
          </span>
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
            {theActivePlayerHP <= 0 && (
              <p>{activePlayerPokemon.name} fainted</p>
            )}
          </div>
        </div>
        <div className="bg-orange-600 content-center">
          <span className="flex justify-start">
            {activeOpponentPokemon.name}
          </span>
          <div className="w-[140px] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              style={{
                width: `${
                  (activeOpponentHP / calculateMaxHP(activeOpponentPokemon)) *
                  100
                }%`,
              }}
              className={`bg-green-600 h-2.5 rounded-full`}
            ></div>
          </div>
          <span className="flex justify-end">
            {activeOpponentHP}/{calculateMaxHP(activeOpponentPokemon)}
          </span>
        </div>
        <button className="flex justify-end">
          <Link
            className="bg-gray-300 hover:bg-gray-500 text-gray-800 px-1 border border-gray-400 rounded shadow"
            href={"/"}
          >
            Reset
          </Link>
        </button>
      </div>
      <div className="flex bg-yellow-600 justify-center">
        <div className="bg-pink-600 w-[650px] mr-1">
          <div className="absolute">Select Move:</div>
          {generateMoveButtons(
            activePlayerPokemon,
            (item: Move) => setDisplayArea({ move: item }),
            (item) => handleMoveOnClick(item)
          )}
          <div className="">Switch:</div>
          {generatePartyButtons(
            playerRoster,
            (partyPokemon: RosterEntry) =>
              setDisplayArea({ rosterEntry: partyPokemon }),
            (item) => handlePartyOnClick(item)
          )}
        </div>
        <div className="bg-gray-200 ml-1 my-2 w-[650px] rounded-xl py-4 px-6">
          {generateDisplayArea(displayArea)}
        </div>
      </div>
      <button
        className="bg-white"
        onClick={() => {
          setPlayerRoster(
            playerRoster.set(activePlayerPokemon.name, {
              pokemon: activePlayerPokemon,
              currentHP: activePlayerHP,
            })
          );
          setActivePlayerPokemon(POKEMONS.GENGAR);
          if (!playerRoster.has(POKEMONS.GENGAR.name)) {
            setPlayerRoster(
              playerRoster.set("pokemon", {
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
