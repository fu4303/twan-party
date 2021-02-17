import { motion, AnimatePresence } from "framer-motion";
import Items from "./Items";

const Category = (props) => {
  const { category } = props;

  return (
    <motion.section className="mb-16" layout>
      <motion.h2 className="mb-8 text-2xl font-bold text-center text-white" layout>
        {category.name}
      </motion.h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Items items={category.items} />
      </div>
    </motion.section>
  );
};

export default function Categories(props) {
  let { categories } = props;
  categories = categories.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <AnimatePresence>
      {categories.map((category, i) => {
        return <Category category={category} key={i} />;
      })}
    </AnimatePresence>
  );
}
