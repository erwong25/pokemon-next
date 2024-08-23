import { animatedSpriteList, staticSpriteList } from "./spritesList";
import type { Type } from "./types";
import { MOVES, type Move } from "./moves";
import { StaticImageData } from "next/image";

const colorVariants = {
  Normal: "bg-Normal",
  Fighting: "bg-Fighting",
  Flying: "bg-Flying",
  Poison: "bg-Poison",
  Ground: "bg-Ground",
  Rock: "bg-Rock",
  Bug: "bg-Bug",
  Ghost: "bg-Ghost",
  Steel: "bg-Steel",
  Water: "bg-Water",
  Fire: "bg-Fire",
  Grass: "bg-Grass",
  Electric: "bg-Electric",
  Psychic: "bg-Psychic",
  Ice: "bg-Ice",
  Dragon: "bg-Dragon",
  Dark: "bg-Dark",
  Fairy: "bg-Fairy",
};

type Stats = {
  atk: number;
  def: number;
  spAtk: number;
  spDef: number;
  sp: number;
  maxHp: number;
};

export type Pokemon = {
  id: number;
  staticSprite: StaticImageData;
  animatedSprite: StaticImageData;
  moves: Array<Move>;
  name: string;
  types: Array<Type>;
  stats: Stats;
};

export type POKEMON_LIST = {
  BULBASAUR: Pokemon;
  IVYSAUR: Pokemon;
  VENUSAUR: Pokemon;
  CHARMANDER: Pokemon;
  CHARMELEON: Pokemon;
  CHARIZARD: Pokemon;
  SQUIRTLE: Pokemon;
  WARTORTLE: Pokemon;
  BLASTOISE: Pokemon;
  NIDORINO: Pokemon;
  GENGAR: Pokemon;
  ARTICUNO: Pokemon;
  ZAPDOS: Pokemon;
  MOLTRES: Pokemon;
  DRAGONITE: Pokemon;
  MEWTWO: Pokemon;
};

export const BULBASAUR: Pokemon = {
  id: 1,
  staticSprite: staticSpriteList.sprite1,
  animatedSprite: animatedSpriteList.sprite1,
  moves: [MOVES.PETAL_DANCE, MOVES.SLUDGE_BOMB, MOVES.TACKLE, MOVES.SLAM],
  name: "Bulbasaur",
  types: ["Grass", "Poison"],
  stats: {
    atk: 49,
    def: 49,
    spAtk: 65,
    spDef: 65,
    sp: 45,
    maxHp: 45,
  },
};

export const IVYSAUR: Pokemon = {
  id: 2,
  staticSprite: staticSpriteList.sprite2,
  animatedSprite: animatedSpriteList.sprite2,
  moves: [MOVES.PETAL_DANCE, MOVES.SLUDGE_BOMB, MOVES.TACKLE, MOVES.SLAM],
  name: "Ivysaur",
  types: ["Grass", "Poison"],
  stats: {
    atk: 62,
    def: 63,
    spAtk: 80,
    spDef: 80,
    sp: 60,
    maxHp: 60,
  },
};

export const VENUSAUR: Pokemon = {
  id: 3,
  staticSprite: staticSpriteList.sprite3,
  animatedSprite: animatedSpriteList.sprite3,
  moves: [MOVES.PETAL_DANCE, MOVES.SLUDGE_BOMB],
  name: "Venusaur",
  types: ["Grass", "Poison"],
  stats: {
    atk: 82,
    def: 83,
    spAtk: 100,
    spDef: 100,
    sp: 80,
    maxHp: 80,
  },
};

export const CHARMANDER: Pokemon = {
  id: 4,
  staticSprite: staticSpriteList.sprite4,
  animatedSprite: animatedSpriteList.sprite4,
  moves: [MOVES.FIRE_BLAST],
  name: "Charmander",
  types: ["Fire"],
  stats: {
    atk: 52,
    def: 43,
    spAtk: 60,
    spDef: 50,
    sp: 65,
    maxHp: 39,
  },
};

export const CHARMELEON: Pokemon = {
  id: 5,
  staticSprite: staticSpriteList.sprite5,
  animatedSprite: animatedSpriteList.sprite5,
  moves: [MOVES.FIRE_BLAST],
  name: "Charmeleon",
  types: ["Fire"],
  stats: {
    atk: 64,
    def: 58,
    spAtk: 80,
    spDef: 65,
    sp: 80,
    maxHp: 58,
  },
};

export const CHARIZARD: Pokemon = {
  id: 6,
  staticSprite: staticSpriteList.sprite6,
  animatedSprite: animatedSpriteList.sprite6,
  moves: [MOVES.FIRE_BLAST, MOVES.HURRICANE],
  name: "Charizard",
  types: ["Fire", "Flying"],
  stats: {
    atk: 84,
    def: 78,
    spAtk: 109,
    spDef: 85,
    sp: 100,
    maxHp: 78,
  },
};

export const SQUIRTLE: Pokemon = {
  id: 7,
  staticSprite: staticSpriteList.sprite7,
  animatedSprite: animatedSpriteList.sprite7,
  moves: [MOVES.HYDRO_PUMP, MOVES.BLIZZARD],
  name: "Squirtle",
  types: ["Water"],
  stats: {
    atk: 48,
    def: 65,
    spAtk: 50,
    spDef: 64,
    sp: 43,
    maxHp: 44,
  },
};

export const WARTORTLE: Pokemon = {
  id: 8,
  staticSprite: staticSpriteList.sprite8,
  animatedSprite: animatedSpriteList.sprite8,
  moves: [MOVES.HYDRO_PUMP, MOVES.BLIZZARD],
  name: "Wartortle",
  types: ["Water"],
  stats: {
    atk: 63,
    def: 80,
    spAtk: 65,
    spDef: 80,
    sp: 58,
    maxHp: 59,
  },
};

export const BLASTOISE: Pokemon = {
  id: 9,
  staticSprite: staticSpriteList.sprite9,
  animatedSprite: animatedSpriteList.sprite9,
  moves: [MOVES.HYDRO_PUMP, MOVES.BLIZZARD],
  name: "Blastoise",
  types: ["Water"],
  stats: {
    atk: 83,
    def: 100,
    spAtk: 85,
    spDef: 105,
    sp: 78,
    maxHp: 79,
  },
};

export const NIDORINO: Pokemon = {
  id: 33,
  staticSprite: staticSpriteList.sprite33,
  animatedSprite: animatedSpriteList.sprite33,
  moves: [MOVES.POISON_JAB, MOVES.HORN_ATTACK, MOVES.DRILL_RUN],
  name: "Nidorino",
  types: ["Poison"],
  stats: {
    atk: 72,
    def: 57,
    spAtk: 55,
    spDef: 55,
    sp: 65,
    maxHp: 61,
  },
};

export const GENGAR: Pokemon = {
  id: 94,
  staticSprite: staticSpriteList.sprite94,
  animatedSprite: animatedSpriteList.sprite94,
  moves: [MOVES.SHADOW_BALL, MOVES.SLUDGE_BOMB],
  name: "Gengar",
  types: ["Poison", "Ghost"],
  stats: {
    atk: 65,
    def: 60,
    spAtk: 130,
    spDef: 75,
    sp: 110,
    maxHp: 60,
  },
};

export const ARTICUNO: Pokemon = {
  id: 144,
  staticSprite: staticSpriteList.sprite144,
  animatedSprite: animatedSpriteList.sprite144,
  moves: [MOVES.BLIZZARD, MOVES.HURRICANE],
  name: "Articuno",
  types: ["Ice", "Flying"],
  stats: {
    atk: 85,
    def: 100,
    spAtk: 95,
    spDef: 125,
    sp: 85,
    maxHp: 90,
  },
};

export const ZAPDOS: Pokemon = {
  id: 145,
  staticSprite: staticSpriteList.sprite145,
  animatedSprite: animatedSpriteList.sprite145,
  moves: [MOVES.THUNDER, MOVES.HURRICANE],
  name: "Zapdos",
  types: ["Electric", "Flying"],
  stats: {
    atk: 90,
    def: 85,
    spAtk: 125,
    spDef: 90,
    sp: 100,
    maxHp: 90,
  },
};

export const MOLTRES: Pokemon = {
  id: 146,
  staticSprite: staticSpriteList.sprite146,
  animatedSprite: animatedSpriteList.sprite146,
  moves: [MOVES.FIRE_BLAST, MOVES.HURRICANE],
  name: "Moltres",
  types: ["Fire", "Flying"],
  stats: {
    atk: 100,
    def: 90,
    spAtk: 125,
    spDef: 85,
    sp: 90,
    maxHp: 90,
  },
};

export const DRAGONITE: Pokemon = {
  id: 149,
  staticSprite: staticSpriteList.sprite149,
  animatedSprite: animatedSpriteList.sprite149,
  moves: [MOVES.DRAGON_CLAW, MOVES.HURRICANE],
  name: "Dragonite",
  types: ["Dragon", "Flying"],
  stats: {
    atk: 134,
    def: 95,
    spAtk: 100,
    spDef: 100,
    sp: 80,
    maxHp: 91,
  },
};

export const MEWTWO: Pokemon = {
  id: 150,
  staticSprite: staticSpriteList.sprite150,
  animatedSprite: animatedSpriteList.sprite150,
  moves: [MOVES.PSYCHIC, MOVES.SHADOW_BALL],
  name: "Mewtwo",
  types: ["Psychic"],
  stats: {
    atk: 110,
    def: 90,
    spAtk: 154,
    spDef: 90,
    sp: 130,
    maxHp: 106,
  },
};

export const POKEMONS: POKEMON_LIST = {
  BULBASAUR,
  IVYSAUR,
  VENUSAUR,
  CHARMANDER,
  CHARMELEON,
  CHARIZARD,
  SQUIRTLE,
  WARTORTLE,
  BLASTOISE,
  NIDORINO,
  GENGAR,
  ARTICUNO,
  ZAPDOS,
  MOLTRES,
  DRAGONITE,
  MEWTWO,
};
