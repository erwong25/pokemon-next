Switch functionality still needs work
-update state when switching

Party window - make shared component between home and battle page \* ask michael on how to get this implemented
--generate buttons without having the button functionality, can extra classes be added to it to customize for each page?
-identify differences between the two pages
-HP bar on battle page does not reflect current HP of the pokemon

Implementing reusable styling for components (like buttons, pokemon party cards)

<!-- Move functions and button out into components -->

<!-- **_How do i move the placeholders into a component?
_**How to move buttons into components with state? -->

<!-- pass onMOuseOver as prop to component -->

<!-- Fix Damage Rollover -->

Add turn order based on speed
-logic for which attack resolves first
-the calculate if something changed for next bit
-keep secondary tracker for current set of states
-return string that is constructed in combat calculation, then dont need to keep track of state

<!-- Fix pokemon fainting -->

Move used displayed is wrong when pokemon faints, implementing turn order should fix this

Party buttons hover over change appearance to indicate it is hovered on

Red or Gray pokeballs to indicate how many pokemon and in which slots are remaining
-maps are not ordered right? i should change the key to a number to then track the order of the pokemon (but then i might have to rewrite a bunch of lines that reference the key of the playerRoster T^T)

If opponentDamage = miss or fainted or no effect -> opponentDamge != number

Disable move selection on player faint

CombatText not generating if pokemon faints in the first move of the first turn before other player moves, opponent also doesnt switch when they faint(but only some of the time? even more confused now), only HP updates (is this related to when it rerenders?)
