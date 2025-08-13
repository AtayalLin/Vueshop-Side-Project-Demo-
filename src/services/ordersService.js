// Local storage based Orders service
// Swappable to real API later; keeps API surface consistent

const KEY = 'orders'

export function listOrders() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]')
    return raw.map(o => ({ createdAt: o.createdAt || Date.now(), ...o }))
  } catch (e) {
    return []
  }
}

export function createOrder(order) {
  const orders = listOrders()
  orders.push(order)
  localStorage.setItem(KEY, JSON.stringify(orders))
  return order
}

export function removeOrder(id) {
  const orders = listOrders().filter(o => o.id !== id)
  localStorage.setItem(KEY, JSON.stringify(orders))
}

