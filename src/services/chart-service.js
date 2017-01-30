import chart from 'chart.js';

export default function chartService () {

  chart.defaults.global.legend.display = false;

  function setLineData (label, color, radius, hoverRadius) {
    return {
      label,
      pointStyle: 'circle',
      fill: false,
      tension: 0.4,
      backgroundColor: color,
      borderColor: color,
      pointHoverBorderWidth: hoverRadius,
      pointHoverBorderColor: 'black',
      pointHoverRadius: hoverRadius,
      pointRadius: radius,
      borderWidth: 2,
      data: []
    };
  }

  //could be used on dashboard trip.detail to highlight miles traveled for each trip
  //could be used on admin dashboard to view miles by mode across all trips
  function configModeChart (context, modes) {
    const dataPlot = {
      labels: [
        'Air',
        'Car',
        'Bus',
        'Train'
      ],
      datasets: [
        {
          data: [modes.air, modes.car, modes.bus, modes.train],
          backgroundColor: [
            'rgba(255, 255, 0, 1.0)',
            'rgba(255, 165, 0, 1.0)',
            'rgba(0, 255, 0, 1.0)',
            'rgba(0, 128, 0, 1.0)'
          ],
          hoverBackgroundColor: [
            'rgba(255, 255, 0, 0.8)',
            'rgba(255, 165, 0, 0.8)',
            'rgba(0, 255, 0, 0.8)',
            'rgba(0, 128, 0, 0.8)'
          ]
        }]
    };
    return new chart(context, {
      type: 'bar',
      data: dataPlot,
      options: {
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            title: function(item) {
              return `${item[0].xLabel} Miles: `;
            },
            afterTitle: function(item) {

              return item[0].yLabel;
            },
            label: function(){},
            afterLabel: function(){}
          }
        }
      }
    });
  }
  
  //finish fixing this method after interview
  function setAxisConfig (firstDate, lastDate) {
    const now = lastDate.createdAt;
    const then = firstDate.createdAt;
    const elapsed = Math.floor(( now - then ) / 86400000);
    if (elapsed >= 15 && elapsed < 90) {
      return 'week';
    } else if (elapsed >= 90) {
      return 'month';
    } else {
      return 'day';
    }
  }

  function configLineChart (context, readings, sysGoal, diaGoal, unitType) {
    const dataPlot = {
      datasets: [
        setLineData('Systolic', 'coral', 1, 2),
        setLineData('Diastolic', 'crimson', 1, 2),
        setLineData('Systolic Goal', 'blue', 0, 0),
        setLineData('Diastolic Goal', 'green', 0, 0)
      ]
    };
    readings.forEach(e => {
      dataPlot.datasets[0].data.push({x: e.createdAt, y: e.systolic});
      dataPlot.datasets[1].data.push({x: e.createdAt, y: e.diastolic});
      dataPlot.datasets[2].data.push({x: e.createdAt, y: sysGoal});
      dataPlot.datasets[3].data.push({x: e.createdAt, y: diaGoal});
    });
    return new chart(context, {
      type: 'line',
      data: dataPlot,
      options: {
        tooltips: {
          enabled: true,
          mode: 'single',
          callbacks: {
            title: function(title) {
              let date = new Date(title[0].xLabel);
              return date.toLocaleDateString();
            }
          }
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: unitType
            },
            position: 'bottom'
          }],
          yAxes: [{
            stacked: false
          }]
        }
      }
    });
  }


  return {
    configModeChart,
    configLineChart
  };

}