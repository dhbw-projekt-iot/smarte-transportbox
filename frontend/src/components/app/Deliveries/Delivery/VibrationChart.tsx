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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom' as const,
    },
  },
};

const labels = [
  '00:00',
  '02:00',
  '04:00',
  '06:00',
  '08:00',
  '10:00',
  '12:00',
  '14:00',
  '16:00',
  '18:00',
  '20:00',
  '22:00',
];

const VibrationChart = ({ transportationTask }) => {
  const minThreshold = {
    type: 'line',
    yMin: transportationTask.constraints.vibration.criticalMinimum,
    yMax: transportationTask.constraints.vibration.criticalMinimum,
    borderColor: 'rgb(255, 99, 132)',
    borderWidth: 4,
  };

  const maxThreshold = {
    type: 'line',
    yMin: transportationTask.constraints.vibration.criticalMaximum,
    yMax: transportationTask.constraints.vibration.criticalMaximum,
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
      dataArray.push(dataPoint.vibration);
      labels.push(dayjs(dataPoint.timestamp).format('HH:mm'));
    });
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'Erschütterungsverlauf.',
        data: dataArray,
        borderColor: '#6366f1',
        backgroundColor: '#6366f1',
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default VibrationChart;
