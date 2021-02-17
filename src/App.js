import { useState, useEffect } from "react";
import { Minus, Plus } from "react-feather";
import { AnimateSharedLayout } from "framer-motion";

import Header from "./Header";
import Categories from "./Categories";
import Footer from "./Footer";

import Links from "./links";

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

    // Return if number is below 0 or above 100
    if (value < 0 || value > 100) {
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
      <Header />
      <main className="container px-4 mx-auto" layout>
        <div className="flex flex-col py-4 mb-8 md:flex-row md:justify-between md:items-center md:sticky md:top-0 md:z-10 md:bg-gray-900">
          <div className="flex items-center justify-between md:justify-center">
            <p className="text-white md:mr-4">Show free items only</p>
            <label className="switch">
              <input
                type="checkbox"
                name="free"
                checked={showFreeItems}
                onChange={() => {
                  setShowFreeItems(!showFreeItems);
                }}
                data-splitbee-event="Toggle Show Free Items"
              />
              <span className="slider"></span>
            </label>
          </div>
          <div className="flex items-center justify-between text-white md:justify-center">
            <p className="md:mr-4">
              How many people <span className="hidden md:inline">are playing</span>?
            </p>
            <div className="flex items-center select-none">
              <Minus
                className="transition-opacity cursor-pointer hover:opacity-50"
                onClick={(e) => {
                  handleAmountOfPlayersChange(e, "-");
                }}
                data-splitbee-event="Minus 1 Player"
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
                data-splitbee-event="Plus 1 Player"
              />
            </div>
          </div>
        </div>
        <AnimateSharedLayout>
          <Categories categories={linksArray} />
        </AnimateSharedLayout>
      </main>
      <Footer />
    </>
  );
}

export default App;
