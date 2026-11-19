import products from './products';

const INVENTORY_KEY = 'buildmart_inventory';

const readInventory = () => {
  try {
    return JSON.parse(localStorage.getItem(INVENTORY_KEY) || '{}');
  } catch (error) {
    console.error('Unable to read saved inventory.', error);
    return {};
  }
};

export const getAvailableStock = (product) => {
  if (!product) return 0;
  const savedInventory = readInventory();
  const catalogProduct = products.find((item) => item.id === product.id);
  return savedInventory[product.id] ?? product.stockCount ?? catalogProduct?.stockCount ?? 0;
};

export const reserveInventory = (items) => {
  if (!Array.isArray(items) || items.some((item) => !item.id || !Number.isInteger(item.quantity) || item.quantity < 1)) {
    throw new Error('Your cart contains an invalid product quantity.');
  }

  const savedInventory = readInventory();
  const requested = items.reduce((totals, item) => {
    totals[item.id] = (totals[item.id] || 0) + item.quantity;
    return totals;
  }, {});

  for (const [id, quantity] of Object.entries(requested)) {
    const item = items.find((product) => product.id === id) || products.find((product) => product.id === id);
    const available = savedInventory[id] ?? item?.stockCount ?? 0;
    if (!item || quantity > available) {
      throw new Error(`${item?.name || 'A product'} no longer has enough stock.`);
    }
  }

  const updatedInventory = { ...savedInventory };
  for (const [id, quantity] of Object.entries(requested)) {
    const item = items.find((product) => product.id === id) || products.find((product) => product.id === id);
    updatedInventory[id] = (savedInventory[id] ?? item.stockCount) - quantity;
  }

  try {
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(updatedInventory));
  } catch (error) {
    console.error('Unable to save inventory changes.', error);
    throw new Error('Unable to reserve product stock. Please try again.');
  }
};
