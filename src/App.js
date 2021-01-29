import Links from "./links";

const Item = (props) => {
  const { item } = props;

  return (
    <article>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <a href={item.link} target="_blank" rel="noreferrer noopener">
        View Item
      </a>
    </article>
  );
};

const Category = (props) => {
  const { category } = props;

  return (
    <section>
      <h2 className="text-white text-center text-2xl font-bold">{category.name}</h2>
      {category.items.map((item, i) => {
        return <Item item={item} key={i} />;
      })}
    </section>
  );
};

function App() {
  return (
    <>
      <header className="container mx-auto px-4 py-32">
        <h1 className="text-center text-white text-3xl font-bold mb-2">Twan.Party 🥳</h1>
        <h2 className="text-center text-gray-200 text-lg">
          No more boring online hangout sessions, find something <span className="text-purple-500 uppercase font-bold">fun</span> to do!
        </h2>
      </header>
      <main className="container mx-auto px-4">
        {Links.map((category, i) => {
          return <Category category={category} key={i} />;
        })}
      </main>
    </>
  );
}

export default App;
