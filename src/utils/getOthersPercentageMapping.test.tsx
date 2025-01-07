import { describe, expect, it, vi } from "vitest";
import { getOthersPercentageMapping } from "@utils";

describe('getOthersPercentageMapping', () => {
    it('returns the correct percentage mapping', () => {
        expect(getOthersPercentageMapping(1)).toBe('Top 5%');
        expect(getOthersPercentageMapping(2)).toBe('Top 4%');
        expect(getOthersPercentageMapping(3)).toBe('Top 3%');
        expect(getOthersPercentageMapping(4)).toBe('Top 2%');
        expect(getOthersPercentageMapping(5)).toBe('Top 1%');
        expect(getOthersPercentageMapping(undefined)).toBe('Undefined %');
    });
})