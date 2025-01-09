//Type your code here.
function generateDoughnutChart(dataset) {
    var ctx = document.getElementById("Chart").getContext('2d');

    var labels = dataset.map(function(obj) {
        return obj.label;
    });
    var values = dataset.map(function(obj) {
        return Number(obj.value || obj.value);
    });
    document.getElementById("Chart").width = window.innerWidth;
    document.getElementById("Chart").height = window.innerHeight;
    var bgColor = dataset.map(function(obj) {
        return obj.color;
    });
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                label: '# of Votes',
                data: values,
                backgroundColor: bgColor,
                borderWidth: 1
            }]
        },
        options: {
            cutoutPercentage: 65,
            tooltips: {
                enabled: false
            }
        }
    });

    return true;
}

function generateBarGraph(barData) {
  
  var monthLabels = barData.map(function(record){
    return record.month;
  });
  
  var values = barData.map(function(record){
    return record.value;
  });
  
  var colors = barData.map(function(record){
    return record.color;
  });
  document.getElementById("Chart").width = window.innerWidth;
    document.getElementById("Chart").height = window.innerHeight;
  var ctx = document.getElementById("Chart").getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: monthLabels,
      datasets: [
        {
          backgroundColor:colors,
          data: values
        }
      ]
    },
    options: {
      legend: { display: false },
      scales: {
        xAxes: [{
            barThickness : 5,
          	ticks : {
              fontSize : 8
            },
           gridLines: {
                    display:false
                }
        }],
        yAxes :[{
          ticks : {
              fontSize : 9
            },
           gridLines: {
                    display:false
                }
        }]
    }
      
    }
});
  
}