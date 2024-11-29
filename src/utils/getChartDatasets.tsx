interface GetChartDataProps {
    dataFormatted: number[] | number[][];
    isComplex: boolean;
}


const getChartDatasets = ({ dataFormatted, isComplex}: GetChartDataProps) => {
    const chartDataSets: any = [
        {
          label: "Current Year Savings",
          data: isComplex ? dataFormatted[0] : [dataFormatted[0]],
          backgroundColor: ["#10a8a9"],
        },
        {
          label: "Yearly Savings",
          data: isComplex ? dataFormatted[1] : [dataFormatted[1]],
          backgroundColor: ["#000038"],
        },
        {
          label: "Monthly Savings",
          data: isComplex ? dataFormatted[2] : [dataFormatted[2]],
          backgroundColor: ["#cccccc"],
        },
      ]
  return [ chartDataSets ]
}

export default getChartDatasets