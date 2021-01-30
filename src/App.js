import { useState } from "react";
import { Users, DollarSign } from "react-feather";
import Sparkles from "./sparkles";

import Links from "./links";
const freeItems = Links.map((cat) => {
  return { ...cat, items: cat.items.filter((items) => items.paid === false) };
});

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

  return (
    <>
      <header className="container mx-auto px-4 py-32">
        <h1 className="text-center text-white text-3xl font-bold mb-2">Twan.Party 🥳</h1>
        <h2 className="text-center text-gray-200 text-lg">
          No more boring online hangout sessions, find something&nbsp;
          <Sparkles>
            <span className="text-purple-500 uppercase text-xl">fun</span>
          </Sparkles>
          &nbsp;to do!
        </h2>
      </header>
      <main className="container mx-auto px-4">
        <div className="flex items-center justify-between md:justify-center mb-6">
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

        <Categories categories={showFreeItems ? freeItems : Links} />
      </main>
    </>
  );
}

export default App;
