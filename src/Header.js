import Sparkles from "./Sparkles";

export default function Header() {
  return (
    <header className="container px-4 py-32 mx-auto">
      <h1 className="mb-2 text-3xl font-bold text-center text-white">
        Twan.<span className="text-purple-500">Party</span> 🥳
      </h1>
      <h2 className="text-lg text-center text-gray-200">
        No more boring online hangout sessions, find something&nbsp;
        <Sparkles>
          <span className="text-xl text-purple-500 uppercase">fun</span>
        </Sparkles>
        &nbsp;to do!
      </h2>
    </header>
  );
}
