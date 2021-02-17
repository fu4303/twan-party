import { motion, AnimateSharedLayout } from "framer-motion";
import { DollarSign, User, Users, ExternalLink } from "react-feather";

const Item = (props) => {
  let { item } = props;

  return (
    <motion.article className="flex flex-col p-4 bg-gray-800 rounded-md" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} layout>
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
    </motion.article>
  );
};

export default function Items(props) {
  let { items } = props;
  items = items.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <AnimateSharedLayout type="crossfade">
      {items.map((item, i) => {
        return <Item item={item} key={i} />;
      })}
    </AnimateSharedLayout>
  );
}
