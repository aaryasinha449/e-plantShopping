import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { id: 'snake', name: 'Snake Plant', image: 'https://images.unsplash.com/photo-1593482892290-f54927ae2b7b?w=500', description: 'Easy-care plant for indoor spaces.', cost: '$15' },
      { id: 'spider', name: 'Spider Plant', image: 'https://images.unsplash.com/photo-1572688484438-313a6e50c6f4?w=500', description: 'Graceful arching green leaves.', cost: '$12' },
      { id: 'peace', name: 'Peace Lily', image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?w=500', description: 'Elegant foliage and white blooms.', cost: '$18' }
    ]
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { id: 'lavender', name: 'Lavender', image: 'https://images.unsplash.com/photo-1499002238440-d264edd596ec?w=500', description: 'Fragrant purple flowers.', cost: '$20' },
      { id: 'jasmine', name: 'Jasmine', image: 'https://images.unsplash.com/photo-1597055181300-a8e3f4f6b7a2?w=500', description: 'Delicate flowers with a sweet scent.', cost: '$18' },
      { id: 'rosemary', name: 'Rosemary', image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=500', description: 'A fragrant herb for home and garden.', cost: '$15' }
    ]
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { id: 'zz', name: 'ZZ Plant', image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=500', description: 'A hardy plant needing little care.', cost: '$25' },
      { id: 'pothos', name: 'Pothos', image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500', description: 'A versatile trailing houseplant.', cost: '$10' },
      { id: 'succulent', name: 'Succulent', image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=500', description: 'A distinctive, water-wise plant.', cost: '$8' }
    ]
  }
];

export default function ProductList({ onHomeClick = () => {} }) {
  const [showCart, setShowCart] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <nav style={{ background: '#287747', color: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="#" onClick={e => { e.preventDefault(); onHomeClick(); setShowCart(false); }} style={{ color: 'white', textDecoration: 'none' }}>
          <strong>Paradise Nursery</strong><br />
          <small>Where Green Meets Serenity</small>
        </a>
        <div>
          <button onClick={() => setShowCart(false)} style={{ marginRight: 12, padding: 8 }}>Plants</button>
          <button onClick={() => setShowCart(true)} style={{ padding: 8 }}>🛒 Cart ({cartCount})</button>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <main style={{ padding: 24, maxWidth: 1200, margin: 'auto' }}>
          <h1>Our Plants</h1>
          <p>Bring nature home with plants for every space.</p>
          {plantsArray.map(group => (
            <section key={group.category}>
              <h2>{group.category}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20, marginBottom: 30 }}>
                {group.plants.map(plant => {
                  const added = cart.some(item => item.id === plant.id);
                  return (
                    <article key={plant.id} style={{ border: '1px solid #ddd', borderRadius: 10, padding: 15 }}>
                      <img src={plant.image} alt={plant.name} style={{ width: '100%', height: 180, objectFit: 'cover', borderRadius: 7 }} />
                      <h3>{plant.name}</h3>
                      <p>{plant.description}</p>
                      <strong>{plant.cost}</strong><br />
                      <button
                        onClick={() => dispatch(addItem(plant))}
                        disabled={added}
                        style={{ marginTop: 12, padding: '10px 14px', background: added ? '#999' : '#287747', color: 'white', border: 0, borderRadius: 5, cursor: added ? 'default' : 'pointer' }}
                      >
                        {added ? 'Added to Cart' : 'Add to Cart'}
                      </button>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </main>
      )}
    </div>
  );
}
