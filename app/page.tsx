"use client";

import React from "react";
import { useState } from "react";
import { POKEMON_LIST, POKEMONS } from "./lib/pokemon";
import Image from "next/image";
import Link from "next/link";
import calculateMaxHP from "./lib/calculateMaxHP";

export default function Home() {
  const pokemonList = Object.keys(POKEMONS) as Array<keyof POKEMON_LIST>;
  const [roster, setRoster] = useState<Array<keyof POKEMON_LIST>>([]);
  return (
    <div>
      <div className="h-full bg-red-600 w-fit flex grid grid-cols-2 gap-4 p-4 mx-auto">
        {roster.map((item) => (
          <div id={item} className="w-80 bg-green-600 flex">
            <Image
              className="h-24 w-auto"
              src={POKEMONS[item].animatedSprite}
              alt=""
            />
            <div className="bg-blue-600 p-2">
              <div className="bg-yellow-600">{POKEMONS[item].name}</div>
              <div>
                <div>HP Bar</div>
              </div>
              <div className="bg-purple-600">
                HP: {calculateMaxHP(POKEMONS[item])}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Link href={"/battle?roster=" + roster.join(",")}>Start Battle</Link>
      {roster.length == 0 ? (
        <h1>Choose your starting pokemon</h1>
      ) : roster.length < 6 ? (
        <h1>Choose your next pokemon</h1>
      ) : null}
      {roster.length < 6 &&
        pokemonList
          .filter((pokemon) => !roster.includes(pokemon))
          .map((item) => (
            <div>
              <Image src={POKEMONS[item].staticSprite} alt="" />
              <button
                onClick={() => {
                  setRoster([...roster, item]);
                }}
              >
                {POKEMONS[item].name}
              </button>
            </div>
          ))}
    </div>
  );
}
