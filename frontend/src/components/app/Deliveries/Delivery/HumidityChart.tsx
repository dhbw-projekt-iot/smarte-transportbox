import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import dayjs from 'dayjs';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const HumidityChart = ({ transportationTask }) => {
  const minThreshold = {
    type: 'line',
    yMin: transportationTask.constraints.humidity.criticalMinimum,
    yMax: transportationTask.constraints.humidity.criticalMinimum,
    borderColor: 'rgb(255, 99, 132)',
    borderWidth: 4,
  };

  const maxThreshold = {
    type: 'line',
    yMin: transportationTask.constraints.humidity.criticalMaximum,
    yMax: transportationTask.constraints.humidity.criticalMaximum,
    borderColor: 'rgb(255, 99, 132)',
    borderWidth: 4,
  };

  const options: any = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: false,
      },
      x: {
        ticks: {
          maxTicksLimit: 24,
        },
      },
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      annotation: {
        annotations: {
          maxThreshold,
          minThreshold,
        },
      },
    },
  };

  let dataArray: any = [];
  let labels: any = [];
  if (transportationTask.measurements) {
    transportationTask.measurements.map((dataPoint) => {
      dataArray.push(dataPoint.humidity);
      labels.push(dayjs(dataPoint.timestamp).format('HH:mm'));
    });
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Feuchtigkeitsverlauf in Prozent.',
        data: dataArray,
        borderColor: '#6366f1',
        backgroundColor: '#6366f1',
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default HumidityChart;
