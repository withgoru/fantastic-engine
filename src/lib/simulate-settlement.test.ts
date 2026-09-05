import { describe, expect, it } from 'vitest'
import { simulateSettlement } from './simulate-settlement'

describe('simulateSettlement', () => {
  it('assumes the 1~20% baseline range when current fee rate is not provided', () => {
    const result = simulateSettlement(null)

    expect(result.usedAssumedRange).toBe(true)
    expect(result.baselineFeeRateLowPercent).toBe(1)
    expect(result.baselineFeeRateHighPercent).toBe(20)
    expect(result.baselineSettlementRateLowPercent).toBe(80)
    expect(result.baselineSettlementRateHighPercent).toBe(99)
    expect(result.currentFeeRatePercent).toBeNull()
    expect(result.currentSettlementRatePercent).toBeNull()
    expect(result.differenceVsBaselineLowPercentPoints).toBeNull()
    expect(result.differenceVsBaselineHighPercentPoints).toBeNull()
  })

  it('computes the settlement rate as 100% minus the current fee rate', () => {
    const result = simulateSettlement(12)

    expect(result.usedAssumedRange).toBe(false)
    expect(result.currentFeeRatePercent).toBe(12)
    expect(result.currentSettlementRatePercent).toBe(88)
  })

  it('reports how many percentage points the current rate is above/below the baseline bounds', () => {
    const result = simulateSettlement(12)

    // baseline settlement range is 80~99, current settlement rate is 88
    expect(result.differenceVsBaselineLowPercentPoints).toBe(8) // 88 - 80
    expect(result.differenceVsBaselineHighPercentPoints).toBe(-11) // 88 - 99
  })

  it('treats a fee rate at the low end of the baseline as within range', () => {
    const result = simulateSettlement(1)

    expect(result.currentSettlementRatePercent).toBe(99)
    expect(result.differenceVsBaselineHighPercentPoints).toBe(0)
  })

  it('treats a fee rate at the high end of the baseline as within range', () => {
    const result = simulateSettlement(20)

    expect(result.currentSettlementRatePercent).toBe(80)
    expect(result.differenceVsBaselineLowPercentPoints).toBe(0)
  })

  it('flags a fee rate worse than the documented baseline (above 20%)', () => {
    const result = simulateSettlement(35)

    expect(result.currentSettlementRatePercent).toBe(65)
    expect(result.differenceVsBaselineLowPercentPoints).toBe(-15)
    expect(result.differenceVsBaselineHighPercentPoints).toBe(-34)
  })

  it('flags a fee rate better than the documented baseline (below 1%)', () => {
    const result = simulateSettlement(0)

    expect(result.currentSettlementRatePercent).toBe(100)
    expect(result.differenceVsBaselineLowPercentPoints).toBe(20)
    expect(result.differenceVsBaselineHighPercentPoints).toBe(1)
  })

  it('rounds fractional percentages to one decimal place', () => {
    const result = simulateSettlement(12.34)

    expect(result.currentSettlementRatePercent).toBe(87.7)
  })

  it('clamps out-of-range input defensively instead of producing invalid settlement rates', () => {
    expect(simulateSettlement(-5).currentFeeRatePercent).toBe(0)
    expect(simulateSettlement(150).currentFeeRatePercent).toBe(100)
  })
})
