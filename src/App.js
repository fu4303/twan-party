import { useState, useEffect } from "react";
import { Users, DollarSign, Minus, Plus } from "react-feather";
import Sparkles from "./sparkles";

import Links from "./links";

const Item = (props) => {
  let { item } = props;

  return (
    <article className="bg-white rounded-md p-4 flex flex-col">
      <h3 className="font-bold mb-4 text-lg flex items-center justify-between">
        {item.title} {item.paid && <DollarSign className="bg-yellow-400 rounded-full p-1.5 box-content flex-none" size={16} />}
      </h3>
      <p className="text-gray-700 flex-grow">{item.description}</p>
      <div className="mt-6 flex items-center justify-between">
        <p className="flex items-center text-purple-500">
          {item.players} <Users className="ml-2" size={24} />
        </p>
        <a className="flex-none px-4 py-2 rounded-full text-white bg-purple-500 hover:bg-purple-600 font-bold" href={item.link} target="_blank" rel="noreferrer noopener">
          Visit Website
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
      <h2 className="text-white text-center text-2xl font-bold mb-8">{category.name}</h2>
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
      <header className="container mx-auto px-4 py-32">
        <h1 className="text-center text-white text-3xl font-bold mb-2">
          Twan.<span className="text-purple-500">Party</span> 🥳
        </h1>
        <h2 className="text-center text-gray-200 text-lg">
          No more boring online hangout sessions, find something&nbsp;
          <Sparkles>
            <span className="text-purple-500 uppercase text-xl">fun</span>
          </Sparkles>
          &nbsp;to do!
        </h2>
      </header>
      <main className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex items-center justify-between md:justify-center mb-8">
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
          <div className="text-white flex items-center justify-between md:justify-center mb-8">
            <p className="md:mr-4">
              How many people <span className="hidden md:inline">are playing</span>?
            </p>
            <div className="flex items-center select-none">
              <Minus
                className="cursor-pointer hover:opacity-50 transition-opacity"
                onClick={(e) => {
                  handleAmountOfPlayersChange(e, "-");
                }}
              />
              <label>
                <input
                  className="w-10 h-10 mx-4 text-xl rounded-md bg-gray-800 text-center appearance-none m-0 focus:outline-none focus:ring focus:ring-purple-500"
                  style={amountOfPlayers === 0 ? { color: "#4b5563" } : null}
                  type="number"
                  name="people"
                  value={amountOfPlayers}
                  onChange={handleAmountOfPlayersChange}
                />
              </label>
              <Plus
                className="cursor-pointer hover:opacity-50 transition-opacity"
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
