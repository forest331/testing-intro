// function notImplemented() {
// 	throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.')
// }

function addToCart(cart, product, quantity) {
	if (quantity <= 0) {
		throw new RangeError('Количество должно быть больше нуля')
	}
	if (quantity > product.stock) {
		throw new RangeError('Недостаточно товара на складе')
	}
	const existing = cart.find(item => item.id === product.id)
	if (existing) {
		const newQuantity = existing.quantity + quantity
		if (newQuantity > existing.stock) {
			throw new RangeError('Недостаточно товара на складе')
		}
		return cart.map(item =>
			item.id === product.id ? { ...item, quantity: newQuantity } : item,
		)
	}
	return [...cart, { ...product, quantity }]
}
function changeQuantity(card, id, quantity) {
	if (quantity <= 0) {
		throw new RangeError('Количество должно быть больше нуля')
	}
	const item = card.find(item => item.id === id)
	if (!item) {
		return card
	}
	if (quantity > item.stock) {
		throw new RangeError('Недостаточно товаров на складе')
	}
	return card.map(item => (item.id === id ? { ...item, quantity } : item))
}
function removeFromCart(card, id) {
	return card.filter(item => item.id !== id)
}
function calculateCartSubtotal(cart) {
	return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
}
function calculateOrderTotal(cart, promoCode = '') {
	const subtotal = calculateCartSubtotal(cart)
	let discount = 0
	if (promoCode === 'SAVE10' && subtotal >= 20000) {
		discount = Math.round(subtotal * 0.1)
	}
	const delivery = subtotal >= 50000 ? 0 : 30000
	const total = subtotal - discount + delivery

	return { subtotal, discount, delivery, total }
}

const cartApi = {
	addToCart,
	changeQuantity,
	removeFromCart,
	calculateCartSubtotal,
	calculateOrderTotal,
}

if (typeof module !== 'undefined') module.exports = cartApi
if (typeof window !== 'undefined') window.cartApi = cartApi
