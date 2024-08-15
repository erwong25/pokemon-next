import type { Type } from "./types";

export enum TypeEffectiveness {
  NOT_VERY_EFFECTIVE = 0.5,
  SUPER_EFFECTIVE = 2,
  NO_EFFECT = 0,
  DEFAULT = 1,
}

export default function typeEffectivenessCalc(
  moveType: Type,
  defenderType: Type
): number {
  switch (moveType) {
    case "Normal":
      switch (defenderType) {
        case "Rock":
        case "Steel":
          return TypeEffectiveness.NOT_VERY_EFFECTIVE;
        case "Ghost":
          return TypeEffectiveness.NO_EFFECT;
        default:
          return TypeEffectiveness.DEFAULT;
      }
    case "Fighting":
      switch (defenderType) {
        case "Normal":
        case "Rock":
        case "Steel":
        case "Ice":
        case "Dark":
          return TypeEffectiveness.SUPER_EFFECTIVE;
        case "Flying":
        case "Poison":
        case "Bug":
        case "Psychic":
        case "Fairy":
          return TypeEffectiveness.NOT_VERY_EFFECTIVE;
        case "Ghost":
          return TypeEffectiveness.NO_EFFECT;
        default:
          return TypeEffectiveness.DEFAULT;
      }
    case "Flying":
      switch (defenderType) {
        case "Fighting":
        case "Bug":
          return TypeEffectiveness.SUPER_EFFECTIVE;
        case "Rock":
        case "Electric":
        case "Steel":
          return TypeEffectiveness.NOT_VERY_EFFECTIVE;
        default:
          return TypeEffectiveness.DEFAULT;
      }
    case "Poison":
      switch (defenderType) {
        case "Grass":
        case "Fairy":
          return TypeEffectiveness.SUPER_EFFECTIVE;
        case "Poison":
        case "Ground":
        case "Rock":
        case "Ghost":
          return TypeEffectiveness.NOT_VERY_EFFECTIVE;
        case "Steel":
          return TypeEffectiveness.NO_EFFECT;
        default:
          return TypeEffectiveness.DEFAULT;
      }
    case "Ground":
      switch (defenderType) {
        case "Poison":
        case "Rock":
        case "Steel":
        case "Fire":
          return TypeEffectiveness.SUPER_EFFECTIVE;
        case "Bug":
        case "Grass":
          return TypeEffectiveness.NOT_VERY_EFFECTIVE;
        case "Flying":
          return TypeEffectiveness.NO_EFFECT;
        default:
          return TypeEffectiveness.DEFAULT;
      }
    case "Rock":
      switch (defenderType) {
        case "Flying":
        case "Bug":
        case "Fire":
        case "Ice":
          return TypeEffectiveness.SUPER_EFFECTIVE;
        case "Fighting":
        case "Ground":
        case "Steel":
          return TypeEffectiveness.NOT_VERY_EFFECTIVE;
        default:
          return TypeEffectiveness.DEFAULT;
      }
    case "Bug":
      switch (defenderType) {
        case "Grass":
        case "Psychic":
        case "Dark":
          return TypeEffectiveness.SUPER_EFFECTIVE;
        case "Fighting":
        case "Flying":
        case "Poison":
        case "Ghost":
        case "Steel":
        case "Fire":
        case "Fairy":
          return TypeEffectiveness.NOT_VERY_EFFECTIVE;
        default:
          return TypeEffectiveness.DEFAULT;
      }
    case "Ghost":
      switch (defenderType) {
        case "Ghost":
        case "Psychic":
          return TypeEffectiveness.SUPER_EFFECTIVE;
        case "Dark":
          return TypeEffectiveness.NOT_VERY_EFFECTIVE;
        case "Normal":
          return TypeEffectiveness.NO_EFFECT;
        default:
          return TypeEffectiveness.DEFAULT;
      }
    case "Steel":
      switch (defenderType) {
        case "Rock":
        case "Ice":
        case "Fairy":
          return TypeEffectiveness.SUPER_EFFECTIVE;
        case "Steel":
        case "Fire":
        case "Water":
        case "Electric":
          return TypeEffectiveness.NOT_VERY_EFFECTIVE;
        default:
          return TypeEffectiveness.DEFAULT;
      }
    case "Fire":
      switch (defenderType) {
        case "Bug":
        case "Steel":
        case "Grass":
        case "Ice":
          return TypeEffectiveness.SUPER_EFFECTIVE;
        case "Rock":
        case "Fire":
        case "Water":
        case "Dragon":
          return TypeEffectiveness.NOT_VERY_EFFECTIVE;
        default:
          return TypeEffectiveness.DEFAULT;
      }
    case "Water":
      switch (defenderType) {
        case "Ground":
        case "Rock":
        case "Fire":
          return TypeEffectiveness.SUPER_EFFECTIVE;
        case "Water":
        case "Grass":
        case "Dragon":
          return TypeEffectiveness.NOT_VERY_EFFECTIVE;
        default:
          return TypeEffectiveness.DEFAULT;
      }
    case "Grass":
      switch (defenderType) {
        case "Ground":
        case "Rock":
        case "Water":
          return TypeEffectiveness.SUPER_EFFECTIVE;
        case "Flying":
        case "Poison":
        case "Bug":
        case "Steel":
        case "Fire":
        case "Grass":
        case "Dragon":
          return TypeEffectiveness.NOT_VERY_EFFECTIVE;
        default:
          return TypeEffectiveness.DEFAULT;
      }
    case "Electric":
      switch (defenderType) {
        case "Flying":
        case "Water":
          return TypeEffectiveness.SUPER_EFFECTIVE;
        case "Grass":
        case "Electric":
        case "Dragon":
          return TypeEffectiveness.NOT_VERY_EFFECTIVE;
        case "Ground":
          return TypeEffectiveness.NO_EFFECT;
        default:
          return TypeEffectiveness.DEFAULT;
      }
    case "Psychic":
      switch (defenderType) {
        case "Fighting":
        case "Poison":
          return TypeEffectiveness.SUPER_EFFECTIVE;
        case "Steel":
        case "Psychic":
          return TypeEffectiveness.NOT_VERY_EFFECTIVE;
        case "Dark":
          return TypeEffectiveness.NO_EFFECT;
        default:
          return TypeEffectiveness.DEFAULT;
      }
    case "Ice":
      switch (defenderType) {
        case "Flying":
        case "Ground":
        case "Grass":
        case "Dragon":
          return TypeEffectiveness.SUPER_EFFECTIVE;
        case "Steel":
        case "Fire":
        case "Water":
        case "Ice":
          return TypeEffectiveness.NOT_VERY_EFFECTIVE;
        default:
          return TypeEffectiveness.DEFAULT;
      }
    case "Dragon":
      switch (defenderType) {
        case "Dragon":
          return TypeEffectiveness.SUPER_EFFECTIVE;
        case "Steel":
          return TypeEffectiveness.NOT_VERY_EFFECTIVE;
        case "Fairy":
          return TypeEffectiveness.NO_EFFECT;
        default:
          return TypeEffectiveness.DEFAULT;
      }
    case "Dark":
      switch (defenderType) {
        case "Ghost":
        case "Psychic":
          return TypeEffectiveness.SUPER_EFFECTIVE;
        case "Fighting":
        case "Dark":
        case "Fairy":
          return TypeEffectiveness.NOT_VERY_EFFECTIVE;
        default:
          return TypeEffectiveness.DEFAULT;
      }
    case "Fairy":
      switch (defenderType) {
        case "Fighting":
        case "Dragon":
        case "Dark":
          return TypeEffectiveness.SUPER_EFFECTIVE;
        case "Poison":
        case "Steel":
        case "Fire":
          return TypeEffectiveness.NOT_VERY_EFFECTIVE;
        default:
          return TypeEffectiveness.DEFAULT;
      }
    default:
      return TypeEffectiveness.DEFAULT;
  }
}

// const NORMAL_EFFECTIVENESS_MAP = new Map<Type, TypeEffectiveness>([
//   ["Normal", TypeEffectiveness.DEFAULT],
//   ["Fighting", TypeEffectiveness.DEFAULT],
//   ["Flying", TypeEffectiveness.DEFAULT],
//   ["Poison", TypeEffectiveness.DEFAULT],
//   ["Ground", TypeEffectiveness.DEFAULT],
//   ["Rock", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//   ["Bug", TypeEffectiveness.DEFAULT],
//   ["Ghost", TypeEffectiveness.NO_EFFECT],
//   ["Steel", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//   ["Water", TypeEffectiveness.DEFAULT],
//   ["Fire", TypeEffectiveness.DEFAULT],
//   ["Grass", TypeEffectiveness.DEFAULT],
//   ["Electric", TypeEffectiveness.DEFAULT],
//   ["Psychic", TypeEffectiveness.DEFAULT],
//   ["Ice", TypeEffectiveness.DEFAULT],
//   ["Dragon", TypeEffectiveness.DEFAULT],
//   ["Dark", TypeEffectiveness.DEFAULT],
//   ["Fairy", TypeEffectiveness.DEFAULT],
// ]);

// export const TYPE_EFFECTIVENESS_MAP: Map<
//   Type,
//   Map<Type, TypeEffectiveness>
// > = new Map([
//   ["Normal", NORMAL_EFFECTIVENESS_MAP],
//   [
//     "Fighting",
//     new Map([
//       ["Normal", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Rock", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Steel", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Ice", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Dark", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Flying", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Poison", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Bug", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Psychic", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Fairy", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Ghost", TypeEffectiveness.NO_EFFECT],
//     ]),
//   ],
//   [
//     "Flying",
//     new Map([
//       ["Fighting", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Bug", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Grass", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Rock", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Electric", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Steel", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//     ]),
//   ],
//   [
//     "Poison",
//     new Map([
//       ["Grass", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Fairy", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Poison", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Ground", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Rock", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Ghost", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Steel", TypeEffectiveness.NO_EFFECT],
//     ]),
//   ],
//   [
//     "Ground",
//     new Map([
//       ["Poison", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Rock", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Steel", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Fire", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Electric", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Bug", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Grass", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Flying", TypeEffectiveness.NO_EFFECT],
//     ]),
//   ],
//   [
//     "Rock",
//     new Map([
//       ["Flying", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Bug", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Fire", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Ice", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Fighting", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Ground", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Steel", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//     ]),
//   ],
//   [
//     "Bug",
//     new Map([
//       ["Grass", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Psychic", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Dark", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Fighting", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Flying", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Poison", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Ghost", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Steel", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Fire", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Fairy", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//     ]),
//   ],
//   [
//     "Ghost",
//     new Map([
//       ["Ghost", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Psychic", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Dark", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Normal", TypeEffectiveness.NO_EFFECT],
//     ]),
//   ],
//   [
//     "Steel",
//     new Map([
//       ["Rock", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Ice", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Fairy", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Steel", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Fire", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Water", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Electric", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//     ]),
//   ],
//   [
//     "Fire",
//     new Map([
//       ["Bug", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Steel", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Grass", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Ice", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Rock", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Fire", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Water", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Dragon", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//     ]),
//   ],
//   [
//     "Water",
//     new Map([
//       ["Ground", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Rock", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Fire", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Water", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Grass", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Dragon", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//     ]),
//   ],
//   [
//     "Grass",
//     new Map([
//       ["Ground", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Rock", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Water", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Flying", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Poison", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Bug", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Steel", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Fire", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Grass", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Dragon", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//     ]),
//   ],
//   [
//     "Electric",
//     new Map([
//       ["Flying", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Water", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Grass", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Electric", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Dragon", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Ground", TypeEffectiveness.NO_EFFECT],
//     ]),
//   ],
//   [
//     "Psychic",
//     new Map([
//       ["Fighting", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Poison", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Steel", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Psychic", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Dark", TypeEffectiveness.NO_EFFECT],
//     ]),
//   ],
//   [
//     "Ice",
//     new Map([
//       ["Flying", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Ground", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Grass", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Dragon", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Steel", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Fire", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Water", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Ice", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//     ]),
//   ],
//   [
//     "Dragon",
//     new Map([
//       ["Dragon", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Steel", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Fairy", TypeEffectiveness.NO_EFFECT],
//     ]),
//   ],
//   [
//     "Dark",
//     new Map([
//       ["Ghost", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Psychic", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Fighting", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Dark", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Fairy", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//     ]),
//   ],
//   [
//     "Fairy",
//     new Map([
//       ["Fighting", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Dragon", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Dark", TypeEffectiveness.SUPER_EFFECTIVE],
//       ["Poison", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Steel", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//       ["Fire", TypeEffectiveness.NOT_VERY_EFFECTIVE],
//     ]),
//   ],
// ]);
