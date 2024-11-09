export default function generateVictoryText(theActivePlayerHP: number) {
  if (theActivePlayerHP == 0) {
    return (
      <div className="bg-red-600 absolute text-black bottom-0 h-[4.5rem] w-[500px]">
        You lose...
      </div>
    );
  } else {
    return (
      <div className="bg-red-600 absolute text-black bottom-0 h-[4.5rem] w-[500px]">
        You win!!
      </div>
    );
  }
}
