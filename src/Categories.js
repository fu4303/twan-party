import Items from "./Items";

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

export default function Categories(props) {
  let { categories } = props;
  categories = categories.sort((a, b) => a.name.localeCompare(b.name));

  return categories.map((category, i) => {
    return <Category category={category} key={i} />;
  });
}
