import ActionButton from "@/components/ActionButton";
import Collapsible from "@/components/Collapsible";
import PlayButton from "@/components/PlayButton";

export default function Home() {
  const username = "Player1";
  const playerLevel = 53;
  return (
    <div className="maze-pattern-bg h-screen flex items-center justify-center">
      <div className="absolute left-10 top-4 right-10 flex justify-between items-center">
        <div className="flex items-center">
          <div className="player-level-bg size-25 flex items-center justify-center z-10">
            <span className="text-2xl text-black">{playerLevel}</span>
          </div>
          <div className="absolute left-16 bg-tertiary border-6 border-border pl-10 pr-4 py-1 rounded">
            <span className="text-2xl">{username}</span>
          </div>
        </div>

        <ActionButton className="bg-primary-variant" variant="light">
          Log In
        </ActionButton>
      </div>

      <div className="h-full w-full flex flex-col justify-center items-center">
        <img src="maze-logo.svg" alt="Maze Logo" className="w-70" />
        <PlayButton className="w-full max-w-sm">Play</PlayButton>
        <div className="flex space-x-4 w-full max-w-sm mt-5">
          <ActionButton className="flex-1">Create</ActionButton>
          <ActionButton className="flex-1">Join</ActionButton>
        </div>
      </div>

      <Collapsible
        className="absolute bottom-10 left-10 max-w-sm w-full"
        title="Settings"
      >
        Consectetur adipiscing elit pellentesque habitant morbi tristique.
        Pulvinar pellentesque habitant morbi tristique. Vel quam elementum
        pulvinar etiam. Pulvinar pellentesque habitant morbi tristique senectus
        et netus et. Elementum integer enim neque volutpat. Faucibus in ornare
        quam viverra orci sagittis. Amet volutpat consequat mauris nunc congue
        nisi vitae suscipit. Dui accumsan sit amet nulla. Proin sagittis nisl
        rhoncus mattis. Enim nulla aliquet porttitor lacus. Arcu odio ut sem
        nulla pharetra diam sit amet. Gravida rutrum quisque non tellus orci ac
        auctor augue
      </Collapsible>
    </div>
  );
}
