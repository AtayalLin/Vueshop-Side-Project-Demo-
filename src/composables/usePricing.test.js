import { describe, it, expect } from 'vitest'
import { calcSubtotal, calcShipping, calcDiscount, calcTotal } from './usePricing'

describe('usePricing', () => {
  it('calcSubtotal', () => {
    const items = [
      { price: 100, quantity: 2 },
      { price: 50, quantity: 1 },
    ]
    expect(calcSubtotal(items)).toBe(250)
  })

  it('calcShipping basic and free threshold', () => {
    expect(calcShipping(0)).toBe(0)
    expect(calcShipping(500)).toBe(80)
    expect(calcShipping(1000)).toBe(0)
  })

  it('calcDiscount percent and fixed', () => {
    expect(calcDiscount(1000, { type: 'percent', value: 10 })).toBe(100)
    expect(calcDiscount(800, { type: 'fixed', value: 200 })).toBe(200)
  })

  it('calcTotal', () => {
    const subtotal = 900
    const shipping = 80
    const discount = 100
    expect(calcTotal({ subtotal, shipping, discount })).toBe(880)
  })
})

