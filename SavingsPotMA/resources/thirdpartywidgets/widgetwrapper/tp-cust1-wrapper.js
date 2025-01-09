cust1 = {

    initializeWidget: function(parentNode, widgetModel) {
        //Assign custom DOM to parentNode to render this widget.
        parentNode.innerHTML = `
        <div style="postion: absolute; width: 100%; height: 100%; font-family: sans-serif;">
            <canvas id="canvas_${widgetModel.id}" class="cust1__canvas" height="300" width="300" style="width: 100%; font-family: 'SourceSansPro-Regular'; position:absolute; top:0px">
            </canvas>
            <div style="position:absolute; top: calc(50% - 25px); width:100%; text-align: center; color: #424242; font-family: 'SourceSansPro-Regular'; font-size: 30px; font-weight: 600;">
                <span id="cust1_label_${widgetModel.id}" style="font-family: 'SourceSansPro-Regular';top: -7px;"></span>
                <span style="display: inline-block; position: relative; font-family: 'SourceSansPro-Regular'; font-size: 17px; top: -7px; margin-left: -5px;">%</span>
            </div>
            <div style="position:absolute; top: calc(50% + 10px); width:100%;text-align: center; color: #727272;font-family: 'SourceSansPro-Regular'; font-size: 11px;">Complete</div>
        <div>
        `;
        cust1.modelChange(widgetModel, 'percentage', widgetModel.percentage)
    },

    modelChange: function(widgetModel, propertyChanged, propertyValue) {
        //Handle widget property changes to update widget's view and
        //trigger custom events based on widget state.
        if (propertyChanged == 'percentage') {
            let percent = parseInt(propertyValue);
            var inter = setInterval(function() {
                if (document.getElementById(`cust1_label_${widgetModel.id}`) == null) {
                    console.log("CUSTOM WIDGET NULL");
                } else {
                    document.querySelector(`#cust1_label_${widgetModel.id}`).innerHTML = parseInt(propertyValue);
                    let canvas = document.querySelector(`#canvas_${widgetModel.id}`);
                    let context = canvas.getContext('2d');

                    context.beginPath();
                    context.clearRect(0, 0, canvas.width, canvas.height)
                    console.log('called')
                    context.arc(150, 150, 130, 0, Math.PI * 2);
                    context.lineWidth = 20;
                    context.lineCap = 'round';
                    context.strokeStyle = '#e3e3e3';
                    context.stroke();
                    context.closePath();

                    var color = '#3d4827ff';
                    if (percent == 100) {
                        color = '#2A9E05ff'
                    }
                    if (percent > 0 && percent <= 100) {
                        context.beginPath();
                        context.strokeStyle = color;
                        context.arc(150, 150, 130, -Math.PI / 2, ((2 * Math.PI) / 100) * percent - Math.PI / 2);
                        context.stroke();
                        context.closePath();
                    }

                    clearInterval(inter);
                }
            }, 500)

        }
    }
};