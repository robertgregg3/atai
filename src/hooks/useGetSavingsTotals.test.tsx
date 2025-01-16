import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MockData } from "../data/mockData";
import useGetSavingsTotals from "./useGetSavingsTotals";

describe('useGetSavingsTotals', () => {
    it('should calculate savings totals correctly when data is provided', async () => {
      const mockData: MockData = [
        {
          ActualSavingsForCurrentYear: ' $58.76 ',
          ActualSavingsForYear: ' $176.28 ',
          ActualSavingsPerMonth: ' $14.69 ',
          CostCenterTag: 'CostCenter1',
          EnvironmentTag: 'Environment1',
          ProductNameTag: 'Product2',
        },
      ];
  
      const { result } = renderHook(() => useGetSavingsTotals(mockData));
  
      await waitFor(() => {
        expect(result.current.savingsTotals).toEqual({
          ActualSavingsForCurrentYear: 58.76,
          ActualSavingsForYear: 176.28,
          ActualSavingsPerMonth: 14.69,
        });
      });
    });
  });