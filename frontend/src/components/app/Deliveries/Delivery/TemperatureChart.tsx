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
import annotationPlugin from 'chartjs-plugin-annotation';
import dayjs from 'dayjs';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  annotationPlugin,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const TemperatureChart = ({ transportationTask }) => {
  const minThreshold = {
    type: 'line',
    yMin: transportationTask.constraints.temperature.criticalMinimum,
    yMax: transportationTask.constraints.temperature.criticalMinimum,
    borderColor: 'rgb(255, 99, 132)',
    borderWidth: 4,
  };

  const maxThreshold = {
    type: 'line',
    yMin: transportationTask.constraints.temperature.criticalMaximum,
    yMax: transportationTask.constraints.temperature.criticalMaximum,
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
      dataArray.push(dataPoint.temperature);
      labels.push(dayjs(dataPoint.timestamp).format('HH:mm'));
    });
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Temperaturverlauf in Grad Celsius',
        data: dataArray,
        borderColor: '#6366f1',
        backgroundColor: '#6366f1',
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default TemperatureChart;
