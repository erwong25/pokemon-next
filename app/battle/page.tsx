"use client";

import React from "react";
import { useState, useEffect } from "react";
import { POKEMON_LIST, POKEMONS, Pokemon, BULBASAUR } from "../lib/pokemon";
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
import generateVictoryText from "../lib/generateVictoryText";

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
  // console.log(opponentRoster);
  const [displayArea, setDisplayArea] = useState<DisplayContent | null>(null);
  const [combatInfo, setCombatInfo] = useState(
    new Map<number, combatContent>()
  );
  const [remainingPlayerPokemon, setRemainingPlayerPokemon] = useState(
    playerRoster.size
  );
  const [remainingOpponentPokemon, setRemainingOpponentPokemon] = useState(
    opponentRoster.size
  );
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (startingPlayerPokemon == null) {
    console.log("startingPlayerPokemon is null");
    return;
  }

  // console.log(remainingPlayerPokemon);

  const activePlayerPokemon = playerRoster.get(
    activePlayerRosterIdentifier
  )?.pokemon;
  const activeOpponentPokemon = opponentRoster.get(
    activeOpponentRosterIdentifier
  )?.pokemon;
  console.log(opponentRoster);
  console.log(activeOpponentRosterIdentifier);
  console.log(opponentRoster.get(activeOpponentRosterIdentifier));
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
    const switchTarget = playerRoster.get(item)?.pokemon;
    if (switchTarget == undefined) {
      return;
    }
    if (playerRoster.get(activePlayerRosterIdentifier)?.currentHP == 0) {
      setActivePlayerRosterIdentifier(item);
      setCombatInfo(new Map());
      setCombatInfo((combatInfo) =>
        combatInfo.set(1, {
          attacker: switchTarget,
          defender: BULBASAUR,
          outcome: "Fainted",
        })
      );
    } else {
      setActivePlayerRosterIdentifier(item);
      setCombatInfo(new Map());
      setCombatInfo((combatInfo) =>
        combatInfo.set(1, {
          attacker: switchTarget,
          defender: BULBASAUR,
          outcome: "Switching",
        })
      );
      activeOpponentAction(2, switchTarget);
    }
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
    setDamageDealt(attackDamage);
    if (typeof attackDamage == "number") {
      if (theActiveOpponentHP - attackDamage <= 0) {
        setOpponentRoster(
          opponentRoster.set(activeOpponentPokemon.name, {
            pokemon: activeOpponentPokemon,
            currentHP: 0,
          })
        );
        const opponentFaintSwitch = randomTeamMember(opponentRoster);
        console.log("setting Combat Info after opponent faints");
        setCombatInfo((combatInfo) =>
          combatInfo.set(order, {
            attacker: activePlayerPokemon,
            defender: activeOpponentPokemon,
            move: selectedMove.name,
            fainting: "opponent",
            opponentFaintSwitch: opponentFaintSwitch,
            outcome: attackDamage,
          })
        );
        // setOpponentRoster(
        //   opponentRoster.set(activeOpponentPokemon.name, {
        //     pokemon: activeOpponentPokemon,
        //     currentHP: 0,
        //   })
        // );
        if (remainingOpponentPokemon - 1 == 0) {
          setRemainingOpponentPokemon(0);
        } else {
          setRemainingOpponentPokemon(remainingOpponentPokemon - 1);
          setActiveOpponentRosterIdentifier(opponentFaintSwitch);
        }
      } else {
        setCombatInfo((combatInfo) =>
          combatInfo.set(order, {
            attacker: activePlayerPokemon,
            defender: activeOpponentPokemon,
            move: selectedMove.name,
            outcome: attackDamage,
          })
        );
        {
          setOpponentRoster(
            opponentRoster.set(activeOpponentPokemon.name, {
              pokemon: activeOpponentPokemon,
              currentHP: theActiveOpponentHP - attackDamage,
            })
          );
        }
      }
    } else {
      setCombatInfo((combatInfo) =>
        combatInfo.set(order, {
          attacker: activePlayerPokemon,
          defender: activeOpponentPokemon,
          move: selectedMove.name,
          outcome: attackDamage,
        })
      );
    }
  }

  function activeOpponentAction(order: number, opponentTarget: Pokemon) {
    if (
      activePlayerPokemon == undefined ||
      activeOpponentPokemon == undefined ||
      theActivePlayerHP == undefined ||
      theActiveOpponentHP == undefined
    ) {
      console.log("activeOpponentAction log");
      return;
    }
    const opponentTargetHP = playerRoster.get(opponentTarget.name)?.currentHP;
    if (opponentTargetHP == undefined) {
      return;
    }
    const opponentMove =
      activeOpponentPokemon.moves[moveSelector(activeOpponentPokemon)];
    setActiveOpponentMove(opponentMove.name);
    const opponentDamage = computeDamage(
      opponentMove,
      activeOpponentPokemon,
      opponentTarget
    );
    setDamageReceived(opponentDamage);
    if (typeof opponentDamage == "number") {
      if (opponentTargetHP - opponentDamage <= 0) {
        setPlayerRoster(
          playerRoster.set(opponentTarget.name, {
            pokemon: opponentTarget,
            currentHP: 0,
          })
        );
        setCombatInfo((combatInfo) =>
          combatInfo.set(order, {
            attacker: activeOpponentPokemon,
            defender: opponentTarget,
            move: opponentMove.name,
            fainting: "player",
            outcome: opponentDamage,
          })
        );
        setRemainingPlayerPokemon(remainingPlayerPokemon - 1);
      } else {
        setCombatInfo((combatInfo) =>
          combatInfo.set(order, {
            attacker: activeOpponentPokemon,
            defender: opponentTarget,
            move: opponentMove.name,
            outcome: opponentDamage,
          })
        );
        setPlayerRoster(
          playerRoster.set(opponentTarget.name, {
            pokemon: opponentTarget,
            currentHP: opponentTargetHP - opponentDamage,
          })
        );
      }
    } else {
      setCombatInfo((combatInfo) =>
        combatInfo.set(order, {
          attacker: activeOpponentPokemon,
          defender: opponentTarget,
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
    setCombatInfo(new Map());
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
        activeOpponentAction(2, activePlayerPokemon);
      } else {
        console.log("opponent fainted, nothing should have happend");
      }
    } else {
      console.log("opponent went first");
      activeOpponentAction(1, activePlayerPokemon);
      if (playerRoster.get(activePlayerPokemon.name)?.currentHP != 0) {
        activePlayerAction(selectedMove, 2);
      } else {
        console.log("player fainted, nothing should have happened");
        // setCombatInfo(combatInfo =>
        //   combatInfo.set(2, {
        //     attacker: activePlayerPokemon,
        //     defender: activeOpponentPokemon,
        //     outcome: "Player fainted",
        //   })
        // );
      }
    }
  }

  // combatText or victoryText variable

  let textOption = generateCombatText(combatInfo);
  if (remainingPlayerPokemon == 0 || remainingOpponentPokemon == 0) {
    textOption = generateVictoryText(theActivePlayerHP);
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
        <div className="bg-white relative flex justify-center my-auto w-[550px] h-[400px]">
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
          {textOption}
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
            playerRoster.get(activePlayerRosterIdentifier),
            (item: Move) => setDisplayArea({ move: item }),
            (item) => handleMoveOnClick(item),
            remainingOpponentPokemon
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
