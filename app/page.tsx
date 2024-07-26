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
      {roster.map((item) => (
        <div className="bg-red flex">
          <div id={item} className="max-w-sm mx-auto">
            <Image src={POKEMONS[item].staticSprite} alt="" />
            {POKEMONS[item].name}
            HP: {calculateMaxHP(POKEMONS[item])}
          </div>
        </div>
      ))}
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
