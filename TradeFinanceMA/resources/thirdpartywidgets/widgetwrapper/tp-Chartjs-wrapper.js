var Chartjs = {
  id: 0,
  initializeWidget: function(parentNode, widgetModel, config) {
    let canvas = document.createElement('canvas');
	parentNode.style = 'height: 100%; width: 100%';
    canvas.style = 'height: 100%; width: 100%';
    parentNode.append(canvas);
    let ctx = canvas.getContext('2d');
    let chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    widgetModel.parentNode = parentNode;

  },

  setData: function(parentNode, data){
    if(parentNode){
      parentNode.innerHTML = '';
      let canvas = document.createElement('canvas')
      parentNode.append(canvas);
      let ctx = canvas.getContext('2d');
      let chart = new Chart(ctx, data);
    }
  },


  modelChange: function(widgetModel, propertyChanged, propertyValue) {
    if(propertyChanged === 'data'){
      this.setData(widgetModel.parentNode, propertyValue);
    }
  }
};