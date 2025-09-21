import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { items, total, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-24">
      <header className="space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">Cart</p>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">Your selections.</h1>
        <p className="text-sm text-neutral-500">
          Review your frames, adjust quantities, or continue exploring the collection.
        </p>
      </header>
      <div className="mt-10 space-y-6">
        {items.length === 0 ? (
          <div className="rounded-3xl border border-neutral-200 bg-white p-12 text-center text-sm text-neutral-500">
            <p>The cart is empty.</p>
            <Link to="/products" className="mt-4 inline-block text-xs uppercase tracking-[0.3em] text-neutral-900">
              View the collection
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-6">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex flex-col gap-6 rounded-3xl border border-neutral-200 bg-white p-6 md:flex-row">
                  <div className="h-32 w-full max-w-[10rem] overflow-hidden rounded-2xl border border-neutral-100 bg-neutral-50">
                    <img src={product.image} alt={product.name} className="h-full w-full object-contain p-4" />
                  </div>
                  <div className="flex flex-1 flex-col gap-3">
                    <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-sm uppercase tracking-[0.3em] text-neutral-400">{product.category}</p>
                        <h2 className="text-lg font-semibold tracking-tight text-neutral-900">{product.name}</h2>
                      </div>
                      <p className="text-lg font-semibold text-neutral-900">${product.price.toFixed(0)}</p>
                    </div>
                    <p className="text-sm text-neutral-500">{product.description}</p>
                    <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="h-10 w-10 rounded-full border border-neutral-200 text-lg"
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                        <button
                          type="button"
                          className="h-10 w-10 rounded-full border border-neutral-200 text-lg"
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        className="text-xs uppercase tracking-[0.3em] text-neutral-400 hover:text-neutral-900"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-3xl border border-neutral-200 bg-white p-6">
              <div className="flex items-center justify-between text-sm">
                <span className="uppercase tracking-[0.3em] text-neutral-400">Subtotal</span>
                <span className="text-lg font-semibold text-neutral-900">${total.toFixed(0)}</span>
              </div>
              <p className="mt-2 text-xs text-neutral-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <button
                  type="button"
                  onClick={() => navigate('/checkout')}
                  className="flex-1 rounded-full bg-neutral-900 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-neutral-700"
                >
                  Proceed to checkout
                </button>
                <button
                  type="button"
                  onClick={clearCart}
                  className="flex-1 rounded-full border border-neutral-200 px-5 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500 transition hover:text-neutral-900"
                >
                  Clear cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
