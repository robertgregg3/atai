export interface GetChartDataProps {
    dataFormatted: number[] | number[][];
    isComplex?: boolean;
    isDoughnutChart?: boolean;
    doughnutChartData?: number[];
}

interface ChartDatasetsProps {
    label: string;
    data: number | (number | number[])[];
    backgroundColor: string[];
    borderColor?: string[];
    borderWidth?: number;
}

export const getChartDatasets = ({ dataFormatted, isComplex = false, isDoughnutChart = false}: GetChartDataProps) => {
    const chartDatasets: ChartDatasetsProps[] | any = isDoughnutChart ? 
      [{
        label: "Product Savings",
        data: dataFormatted,
        backgroundColor: [
          "#10a8a9",
          "#000038",
          "#cccccc",
          "#f9da7b",
          "#d1da8d",
          "#9dcece",
          "#8989a0",
          "#0b7083",
        ],
        borderColor: ["#ffffff"],
        borderWidth: 0,
      }]
      : [
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
  return chartDatasets
}
