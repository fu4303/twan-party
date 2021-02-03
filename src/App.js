import { useState, useEffect } from "react";
import { User, Users, DollarSign, Minus, Plus, ExternalLink } from "react-feather";
import Sparkles from "./sparkles";

import Links from "./links";

const Item = (props) => {
  let { item } = props;

  return (
    <article className="flex flex-col p-4 bg-gray-800 rounded-md">
      <h3 className="flex items-center justify-between mb-4 text-lg font-bold text-white">
        {item.title} {item.paid && <DollarSign className="bg-yellow-400 rounded-full p-1.5 box-content flex-none text-black" size={16} />}
      </h3>
      <p className="flex-grow text-gray-400">{item.description}</p>
      <div className="flex items-center justify-between mt-6">
        <p className="flex items-center text-purple-500">
          {item.players === "1+" ? <User className="mr-2" size={24} /> : <Users className="mr-2" size={24} />}
          {item.players}
        </p>
        <a
          className="relative inline-flex items-center flex-none px-4 py-2 font-bold text-white transition-all duration-300 bg-purple-700 rounded-full hover:pr-10 group hover:bg-purple-600"
          href={item.link}
          target="_blank"
          rel="noreferrer noopener"
          data-splitbee-event="External Link"
          data-splitbee-event-type={item.title}
        >
          <span>Visit Website</span>
          <ExternalLink className="-mt-0.5 absolute right-4 opacity-0 group-hover:opacity-100 transition duration-300 transform-gpu -translate-x-1	group-hover:translate-x-0" size={16} />
        </a>
      </div>
    </article>
  );
};

const Items = (props) => {
  let { items } = props;
  items = items.sort((a, b) => a.title.localeCompare(b.title));

  return items.map((item, i) => {
    return <Item item={item} key={i} />;
  });
};

const Category = (props) => {
  const { category } = props;

  return (
    <section className="mb-16">
      <h2 className="mb-8 text-2xl font-bold text-center text-white">{category.name}</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Items items={category.items} />
      </div>
    </section>
  );
};

const Categories = (props) => {
  let { categories } = props;
  categories = categories.sort((a, b) => a.name.localeCompare(b.name));

  return categories.map((category, i) => {
    return <Category category={category} key={i} />;
  });
};

function App() {
  const [showFreeItems, setShowFreeItems] = useState(false);
  const [amountOfPlayers, setAmountOfPlayers] = useState(0);
  const [linksArray, setLinksArray] = useState(Links);

  useEffect(() => {
    let linksArray = Links;

    const filters = {
      free: showFreeItems,
      players: Number(amountOfPlayers),
    };

    if (filters.free) {
      linksArray = linksArray.map((Link) => {
        return { ...Link, items: Link.items.filter((item) => !item.paid) };
      });
    }

    if (filters.players !== 0) {
      linksArray = linksArray.map((Link) => {
        return {
          ...Link,
          items: Link.items.filter((item) => {
            var player_amount = item.players.split(/[.*+-/_]/);
            var minimum = player_amount[0];
            if (filters.players >= minimum) {
              var maximum = player_amount[1];
              if (maximum) {
                return filters.players <= maximum;
              }
              return true;
            }
            return false;
          }),
        };
      });
    }

    linksArray = linksArray.filter((Link) => {
      return Link.items.length;
    });

    return setLinksArray(linksArray);
  }, [showFreeItems, amountOfPlayers]);

  const handleAmountOfPlayersChange = (event, operation) => {
    if (operation === "-") {
      return setAmountOfPlayers(Number(amountOfPlayers) > 0 ? Number(amountOfPlayers) - 1 : 0);
    }
    if (operation === "+") {
      return setAmountOfPlayers(Number(amountOfPlayers) < 100 ? Number(amountOfPlayers) + 1 : 100);
    }

    let { value } = event.target;

    // Return if the value includes a non-numeric keystroke
    const regex = /[0-9]|\./;
    if (!regex.test(value) && value !== "") {
      return;
    }

    // Return if number is above 100
    if (value > 100) {
      return;
    }

    // Return if number is below 0
    if (value < 0) {
      return;
    }

    // Remove stupid zeros
    if (value[0] === "0" && value.length > 1) {
      value = value.substring(1);
    }

    if (value === "0") {
      value = 0;
    }

    setAmountOfPlayers(value);
  };

  return (
    <>
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
      <main className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex items-center justify-between mb-8 md:justify-center">
            <p className="text-white md:mr-4">Show free items only</p>
            <label className="switch">
              <input
                type="checkbox"
                name="free"
                checked={showFreeItems}
                onChange={() => {
                  setShowFreeItems(!showFreeItems);
                }}
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="flex items-center justify-between mb-8 text-white md:justify-center">
            <p className="md:mr-4">
              How many people <span className="hidden md:inline">are playing</span>?
            </p>
            <div className="flex items-center select-none">
              <Minus
                className="transition-opacity cursor-pointer hover:opacity-50"
                onClick={(e) => {
                  handleAmountOfPlayersChange(e, "-");
                }}
              />
              <label>
                <input
                  className="w-10 h-10 m-0 mx-4 text-xl text-center bg-gray-800 rounded-md appearance-none focus:outline-none focus:ring focus:ring-purple-500"
                  style={amountOfPlayers === 0 ? { color: "#4b5563" } : null}
                  type="number"
                  name="people"
                  value={amountOfPlayers}
                  onChange={handleAmountOfPlayersChange}
                />
              </label>
              <Plus
                className="transition-opacity cursor-pointer hover:opacity-50"
                onClick={(e) => {
                  handleAmountOfPlayersChange(e, "+");
                }}
              />
            </div>
          </div>
        </div>

        <Categories categories={linksArray} />
      </main>
    </>
  );
}

export default App;
