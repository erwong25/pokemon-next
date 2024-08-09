import type { Type } from "./types";

export type DamageCategory = "Physical" | "Special";

export type Move = {
  name: string;
  type: Type;
  power: number;
  accuracy: number; // as decimal
  damageCategory: DamageCategory;
};

export const TACKLE: Move = {
  name: "Tackle",
  type: "Normal",
  power: 40,
  accuracy: 1,
  damageCategory: "Physical",
};

export const SLAM: Move = {
  name: "Slam",
  type: "Normal",
  power: 80,
  accuracy: 0.75,
  damageCategory: "Physical",
};

export const POISON_JAB: Move = {
  name: "Poison Jab",
  type: "Poison",
  power: 80,
  accuracy: 1,
  damageCategory: "Physical",
};

export const HORN_ATTACK: Move = {
  name: "Horn Attack",
  type: "Normal",
  power: 65,
  accuracy: 1,
  damageCategory: "Physical",
};

export const DRILL_RUN: Move = {
  name: "Drill Run",
  type: "Ground",
  power: 80,
  accuracy: 0.95,
  damageCategory: "Physical",
};

export const SHADOW_BALL: Move = {
  name: "Shadow Ball",
  type: "Ghost",
  power: 80,
  accuracy: 1,
  damageCategory: "Special",
};

export const SLUDGE_BOMB: Move = {
  name: "Sludge Bomb",
  type: "Poison",
  power: 90,
  accuracy: 1,
  damageCategory: "Special",
};

export const HYDRO_PUMP: Move = {
  name: "Hydro Pump",
  type: "Water",
  power: 110,
  accuracy: 0.8,
  damageCategory: "Special",
};

export const BLIZZARD: Move = {
  name: "Blizzard",
  type: "Ice",
  power: 110,
  accuracy: 0.7,
  damageCategory: "Special",
};

export const FIRE_BLAST: Move = {
  name: "Fire Blast",
  type: "Fire",
  power: 110,
  accuracy: 0.85,
  damageCategory: "Special",
};

export const THUNDER: Move = {
  name: "Thunder",
  type: "Electric",
  power: 110,
  accuracy: 0.7,
  damageCategory: "Special",
};

export const HURRICANE: Move = {
  name: "Hurricane",
  type: "Flying",
  power: 110,
  accuracy: 0.7,
  damageCategory: "Special",
};

export const DRAGON_CLAW: Move = {
  name: "Dragon Claw",
  type: "Dragon",
  power: 80,
  accuracy: 1,
  damageCategory: "Physical",
};

export const PSYCHIC: Move = {
  name: "Psychic",
  type: "Psychic",
  power: 90,
  accuracy: 1,
  damageCategory: "Special",
};

export const PETAL_DANCE: Move = {
  name: "Petal Dance",
  type: "Grass",
  power: 120,
  accuracy: 1,
  damageCategory: "Special",
};

export const MOVES = {
  TACKLE,
  SLAM,
  POISON_JAB,
  HORN_ATTACK,
  DRILL_RUN,
  SHADOW_BALL,
  SLUDGE_BOMB,
  HYDRO_PUMP,
  BLIZZARD,
  FIRE_BLAST,
  THUNDER,
  HURRICANE,
  DRAGON_CLAW,
  PSYCHIC,
  PETAL_DANCE,
};
