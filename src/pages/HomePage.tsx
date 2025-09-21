import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';
import { Product } from '../types/product';

interface HomePageProps {
  onOpenCart: () => void;
}

const products = productsData as Product[];

const HomePage = ({ onOpenCart }: HomePageProps) => {
  const featured = products.slice(0, 3);

  return (
    <div className="space-y-20 pb-24">
      <Hero onOpenCart={onOpenCart} />
      <section className="mx-auto w-full max-w-6xl px-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Featured</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900">Curated picks for now</h2>
          </div>
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
          >
            <Link
              to="/products"
              className="text-xs uppercase tracking-[0.35em] text-neutral-500 transition hover:text-neutral-900"
            >
              View all
            </Link>
          </motion.div>
        </div>
        <motion.div
          className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.08,
              },
            },
          }}
        >
          {featured.map((product) => (
            <motion.div
              key={product.id}
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <ProductCard product={product} showDescription onAdd={onOpenCart} />
            </motion.div>
          ))}
        </motion.div>
      </section>
      <section className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-10 rounded-[3rem] border border-neutral-200 bg-white p-10 md:grid-cols-3">
          {[
            {
              title: 'Featherweight comfort',
              copy: 'Titanium alloys and sculpted acetate temples create an effortless, balanced fit for all-day wear.',
            },
            {
              title: 'Ocean-ready optics',
              copy: 'Polarised UV400 lenses with hydrophobic coatings keep horizons crisp through glare and spray.',
            },
            {
              title: 'Atelier craftsmanship',
              copy: 'Each frame is hand-assembled, polished, and inspected in our Los Angeles studio for lasting precision.',
            },
          ].map((feature) => (
            <div key={feature.title} className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-[0.35em] text-neutral-500">{feature.title}</h3>
              <p className="text-sm text-neutral-500">{feature.copy}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
