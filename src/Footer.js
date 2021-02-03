import { GitHub, Twitter } from "react-feather";

export default function Footer() {
  return (
    <footer>
      <div className="container flex flex-col items-center px-4 py-16 mx-auto sm:flex-row">
        <p className="flex items-center justify-center font-medium text-white md:justify-start">
          <span className="ml-3 text-xl font-bold">Twan Mulder</span>
        </p>
        <p className="mt-4 text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l sm:border-purple-500 sm:py-2 sm:mt-0">
          © {new Date().getFullYear()} —
          <a className="ml-1 text-gray-600 hover:text-purple-500" href="https://twitter.com/toktoktwan" rel="noopener noreferrer" target="_blank" data-splitbee-event="External Link" data-splitbee-event-type="Twitter">
            @toktoktwan
          </a>
        </p>
        <span className="inline-flex justify-center mt-4 sm:ml-auto sm:mt-0 sm:justify-start">
          <a className="ml-3 text-gray-500 hover:text-purple-500" href="https://github.com/twanmulder/twan.party" rel="noopener noreferrer" target="_blank" data-splitbee-event="External Link" data-splitbee-event-type="GitHub">
            <GitHub size={16} />
            <span className="sr-only">Go to GitHub profile</span>
          </a>
          <a className="ml-3 text-gray-500 hover:text-purple-500" href="https://twitter.com/toktoktwan" rel="noopener noreferrer" target="_blank" data-splitbee-event="External Link" data-splitbee-event-type="Twitter">
            <Twitter size={16} />
            <span className="sr-only">Go to Twitter profile</span>
          </a>
        </span>
      </div>
    </footer>
  );
}
