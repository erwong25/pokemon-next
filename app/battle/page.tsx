"use client";

import React from "react";
import { useState, useEffect } from "react";
import { POKEMON_LIST, POKEMONS, Pokemon } from "../lib/pokemon";
import type { CombatOutcome } from "../lib/damageCalculations";
import type { Move } from "../lib/moves";
import Image from "next/image";
import calculateMaxHP from "../lib/calculateMaxHP";
import generatePlayerRoster, { RosterEntry } from "../lib/generatePlayerRoster";
import Link from "next/link";
import generateDisplayArea from "../lib/generateDisplayArea";
import type { DisplayContent } from "../lib/generateDisplayArea";
import generatePartyButtons from "../ui/battle/generatePartyButtons";
import generateMoveButtons from "../ui/battle/generateMoveButtons";
import moveSelector from "../lib/moveSelector";
import computeDamage from "../lib/damageCalculations";
import randomTeamMember from "../lib/randomTeamMember";
import generateCombatText, { combatContent } from "../lib/generateCombatText";

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
  const clone = structuredClone(POKEMONS);
  const randomRoster = [] as Array<keyof POKEMON_LIST>;
  for (let i = 0; i < roster.length; i++) {
    const randomPokemon = Object.keys(clone)[
      Math.floor(Math.random() * Object.keys(clone).length)
    ] as keyof POKEMON_LIST;
    randomRoster.push(randomPokemon);
    delete clone[randomPokemon];
  }
  const startingOpponentPokemon = randomRoster[0];
  // const startingOpponentPokemon = Object.keys(POKEMONS)[
  //   Math.floor(Math.random() * Object.keys(POKEMONS).length)
  // ] as keyof POKEMON_LIST;
  const [activePlayerRosterIdentifier, setActivePlayerRosterIdentifier] =
    useState(POKEMONS[startingPlayerPokemon].name);
  const [activeOpponentRosterIdentifier, setActiveOpponentRosterIdentifier] =
    useState(POKEMONS[startingOpponentPokemon].name);
  const [damageDealt, setDamageDealt] = useState<CombatOutcome>(0);
  const [damageReceived, setDamageReceived] = useState<CombatOutcome>(0);
  const [activePlayerMove, setActivePlayerMove] = useState("");
  const [activeOpponentMove, setActiveOpponentMove] = useState("");
  const [playerRoster, setPlayerRoster] = useState(
    generatePlayerRoster(roster)
  );
  const [opponentRoster, setOpponentRoster] = useState(
    generatePlayerRoster(randomRoster)
  );
  const [displayArea, setDisplayArea] = useState<DisplayContent | null>(null);
  const [combatInfo, setCombatInfo] = useState(
    new Map<number, combatContent>()
  );
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (startingPlayerPokemon == null) {
    console.log("startingPlayerPokemon is null");
    return;
  }

  const activePlayerPokemon = playerRoster.get(
    activePlayerRosterIdentifier
  )?.pokemon;
  const activeOpponentPokemon = opponentRoster.get(
    activeOpponentRosterIdentifier
  )?.pokemon;
  if (activePlayerPokemon == undefined || activeOpponentPokemon == undefined) {
    console.log("activePokemon is undefined");
    return;
  }
  const theActivePlayerHP = playerRoster.get(
    activePlayerPokemon.name
  )?.currentHP;
  const theActiveOpponentHP = opponentRoster.get(
    activeOpponentPokemon.name
  )?.currentHP;
  if (theActivePlayerHP == undefined || theActiveOpponentHP == undefined) {
    console.log("theActiveHP is undefined");
    return;
  }

  function handlePartyOnClick(item: string) {
    setActivePlayerRosterIdentifier(item);
  }

  function activePlayerAction(selectedMove: Move, order: number) {
    if (
      activePlayerPokemon == undefined ||
      activeOpponentPokemon == undefined ||
      theActivePlayerHP == undefined ||
      theActiveOpponentHP == undefined
    ) {
      console.log("activePlayerAction log");
      return;
    }
    setActivePlayerMove(selectedMove.name);
    const attackDamage = computeDamage(
      selectedMove,
      activePlayerPokemon,
      activeOpponentPokemon
    );
    if (typeof attackDamage == "number") {
      setDamageDealt(attackDamage);
      setCombatInfo(
        combatInfo.set(order, {
          attacker: activePlayerPokemon,
          defender: activeOpponentPokemon,
          move: selectedMove.name,
          outcome: attackDamage,
        })
      );
      if (theActiveOpponentHP - attackDamage <= 0) {
        setOpponentRoster(
          opponentRoster.set(activeOpponentPokemon.name, {
            pokemon: activeOpponentPokemon,
            currentHP: 0,
          })
        );
      } else {
        setOpponentRoster(
          opponentRoster.set(activeOpponentPokemon.name, {
            pokemon: activeOpponentPokemon,
            currentHP: theActiveOpponentHP - attackDamage,
          })
        );
      }
    } else {
      setDamageDealt(attackDamage);
      setCombatInfo(
        combatInfo.set(order, {
          attacker: activePlayerPokemon,
          defender: activeOpponentPokemon,
          move: selectedMove.name,
          outcome: attackDamage,
        })
      );
    }
  }

  function activeOpponentAction(order: number) {
    if (
      activePlayerPokemon == undefined ||
      activeOpponentPokemon == undefined ||
      theActivePlayerHP == undefined ||
      theActiveOpponentHP == undefined
    ) {
      console.log("activeOpponentAction log");
      return;
    }
    const opponentMove =
      activeOpponentPokemon.moves[moveSelector(activeOpponentPokemon)];
    setActiveOpponentMove(opponentMove.name);

    const opponentDamage = computeDamage(
      opponentMove,
      activeOpponentPokemon,
      activePlayerPokemon
    );
    if (typeof opponentDamage == "number") {
      setDamageReceived(opponentDamage);
      setCombatInfo(
        combatInfo.set(order, {
          attacker: activeOpponentPokemon,
          defender: activePlayerPokemon,
          move: opponentMove.name,
          outcome: opponentDamage,
        })
      );
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
    } else {
      setDamageReceived(opponentDamage);
      setCombatInfo(
        combatInfo.set(order, {
          attacker: activeOpponentPokemon,
          defender: activePlayerPokemon,
          move: opponentMove.name,
          outcome: opponentDamage,
        })
      );
    }
  }

  function handleMoveOnClick(selectedMove: Move) {
    if (
      activePlayerPokemon == undefined ||
      activeOpponentPokemon == undefined ||
      theActivePlayerHP == undefined ||
      theActiveOpponentHP == undefined
    ) {
      console.log("handleMoveOnClick log");
      return;
    }
    let speedTieBreak = -1;
    if (activePlayerPokemon.stats.sp == activeOpponentPokemon.stats.sp) {
      console.log("there is a speed tie");
      speedTieBreak = Math.floor(Math.random() * 2);
    }
    if (
      speedTieBreak == 0 ||
      activePlayerPokemon.stats.sp > activeOpponentPokemon.stats.sp
    ) {
      console.log("player went first");
      activePlayerAction(selectedMove, 1);
      if (opponentRoster.get(activeOpponentPokemon.name)?.currentHP != 0) {
        console.log(
          "current HP",
          opponentRoster.get(activeOpponentPokemon.name)?.currentHP
        );
        activeOpponentAction(2);
      } else {
        console.log("opponent fainted, nothing should have happend");
        const opponentFaintSwitch = randomTeamMember(opponentRoster);
        setCombatInfo(
          combatInfo.set(2, {
            attacker: activeOpponentPokemon,
            defender: activePlayerPokemon,
            opponentFaintSwitch: opponentFaintSwitch,
            outcome: "Fainted",
            //how to include which pokemon fainted, should i add string to option for move so i can add opponentFaintSwitch to combatInfo
          })
        );
        setActiveOpponentRosterIdentifier(opponentFaintSwitch);
      }
    } else {
      console.log("opponent went first");
      activeOpponentAction(1);
      if (theActivePlayerHP != 0) {
        activePlayerAction(selectedMove, 2);
        if (theActiveOpponentHP == 0) {
          setActiveOpponentRosterIdentifier(randomTeamMember(opponentRoster));
        }
      } else {
        console.log("player fainted, nothing should have happened");
      }
    }
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
              priority={true}
              className=""
              src={activePlayerPokemon.animatedSprite}
              alt=""
            />
          </div>
          {hydrated && (
            <div className="bg-blue-600 m-auto scale-[2]">
              <Image
                priority={true}
                className=""
                src={activeOpponentPokemon.animatedSprite}
                alt=""
                suppressHydrationWarning
              />
            </div>
          )}
          {generateCombatText(
            combatInfo
            // activePlayerPokemon,
            // activeOpponentPokemon,
            // theActivePlayerHP,
            // activePlayerMove,
            // activeOpponentMove,
            // damageDealt,
            // damageReceived
          )}
        </div>
        {hydrated && (
          <div
            className="bg-orange-600 content-center"
            suppressHydrationWarning
          >
            <span className="flex justify-start">
              {activeOpponentPokemon.name}
            </span>
            <div
              className="w-[140px] bg-gray-200 rounded-full h-2.5 dark:bg-gray-700"
              suppressHydrationWarning
            >
              <div
                style={{
                  width: `${
                    (theActiveOpponentHP /
                      calculateMaxHP(activeOpponentPokemon)) *
                    100
                  }%`,
                }}
                className={`bg-green-600 h-2.5 rounded-full`}
              ></div>
            </div>
            <span className="flex justify-end">
              {theActiveOpponentHP}/{calculateMaxHP(activeOpponentPokemon)}
            </span>
          </div>
        )}
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
      {/* <button
        className="bg-white"
        onClick={() => {
          setPlayerRoster(
            playerRoster.set(activePlayerPokemon.name, {
              pokemon: activePlayerPokemon,
              currentHP: activePlayerHP,
            })
          );
          setActivePlayerRosterIdentifier(POKEMONS.GENGAR);
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
      </button> */}
    </div>
  );
}
