import { CsvDataProps, SavingsTotalsTypes } from '@components/charts/chart.types';
import { useEffect, useState } from 'react'

const useGetSavingsTotals = (data: CsvDataProps[]) => {
    
    const [savingsTotals, setSavingsTotals] = useState<SavingsTotalsTypes>({
        ActualSavingsForCurrentYear: 0,
        ActualSavingsForYear: 0,
        ActualSavingsPerMonth: 0
      });

    useEffect(() => {
        if (data) {
          const totals = data[data.length -1]

          const savingsCurYr = String(totals.ActualSavingsForCurrentYear).trim().replace(/[^0-9.-]+/g, "");
          const savingsYr = String(totals.ActualSavingsForYear).trim().replace(/[^0-9.-]+/g, "");
          const savingsMnth = String(totals.ActualSavingsPerMonth).trim().replace(/[^0-9.-]+/g, "")
    
          setSavingsTotals({
            ActualSavingsForCurrentYear: parseFloat(savingsCurYr),
            ActualSavingsForYear: parseFloat(savingsYr),
            ActualSavingsPerMonth: parseFloat(savingsMnth)
          })
        }
      }, [data]);

  return { savingsTotals }
}

export default useGetSavingsTotals