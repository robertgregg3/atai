import { useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import './doughnutChart.css'
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ chartData, chartLabels, chartTitle }) => {
  useEffect(() => {
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: chartTitle,
      },
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
        },
        padding: 300
      },
      tooltip: {
        callbacks: {
            label: (context) => {
                let label = context.dataset.label || '';
                if (label) {
                    label += ` -- ${context.label}: $` + Math.round(context.parsed).toFixed(2);
                }
                return label;
            }
        }
      } 
    }
  };
  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Product Savings",
        data: chartData,
        backgroundColor: [
          "#10a8a9",
          "#000038",
          "#cccccc",
        ],
        borderColor: [
          '#ffffff'
        ],
        borderWidth: 2,
      },
    ],
  };
  return (
    <div className="chart-doughnut">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default DoughnutChart;
