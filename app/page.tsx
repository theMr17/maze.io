import Image from "next/image";

export default function Home() {
  const username = "Player1";
  const playerLevel = 53;
  return (
    <div className="maze-pattern-bg h-screen flex items-center justify-center">
      <div className="absolute top-4 left-4 flex items-center">
        <div className="player-level-bg size-18 flex items-center justify-center z-10">
          <span className="text-xl text-black">{playerLevel}</span>
        </div>
        <div className="-translate-x-9 bg-tertiary border-6 border-border pl-10 pr-4 py-1">
          <span className="text-2xl">{username}</span>
        </div>
      </div>

      <div className="absolute top-4 right-4 flex space-x-4">
        <div className="relative size-10 cursor-pointer">
          <Image src="/settings.svg" alt="Settings" fill />
        </div>
        <div className="relative size-10 cursor-pointer">
          <Image src="/volume.svg" alt="Volume" fill />
        </div>
      </div>

      <div className="flex h-full w-full">
        <div className="flex flex-col justify-center w-64">
          <div className="bg-tertiary p-4 align-center justify-center">
            <h2 className="text-white mb-2">Customize</h2>
            <input
              placeholder="UserName"
              className="w-full p-2 mb-2 text-black rounded"
            />
            <button className="bg-cyan-300 text-black w-full py-2 rounded mb-2">
              Save
            </button>
            <button className="bg-yellow-200 text-black w-full py-2 rounded">
              Sign Out
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center">
          <img src="maze-logo.svg" alt="Maze Logo" className="w-70" />
          <button className=" bg-secondary text-white text-3xl w-full max-w-sm px-6 py-2 border-border border-6 mt-10 cursor-pointer">
            Play
          </button>
          <div className="flex space-x-4 w-full max-w-sm mt-5">
            <button className="flex-1 bg-tertiary text-white text-2xl px-6 py-2 cursor-pointer">
              Create
            </button>
            <button className="flex-1 bg-tertiary text-white text-2xl px-6 py-2 cursor-pointer">
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
