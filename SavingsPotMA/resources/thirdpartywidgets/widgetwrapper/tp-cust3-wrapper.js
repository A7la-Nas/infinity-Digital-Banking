cust3 = {

    initializeWidget: function(parentNode, widgetModel) {
        parentNode.innerHTML = `
        <style>
            perctangeCust3::after{
                content: "%";
                position: absolute;
                top: 0px;
                left: 100%;
                font-size: 17px;
            }
        </style>
        <div style="postion: absolute; width: 100%; height: 100%; font-family: sans-serif;">
            <canvas id="canvas2_${widgetModel.id}" height="300" width="300" style="width: 100%; font-family: 'SourceSansPro-Regular'; position:absolute; top:0px">
            </canvas>
            <div class="perctangeCust3" style="position:absolute; top: calc(50% - 30px); width:100%; text-align: center;font-family: 'SourceSansPro-Regular';  color: #424242; font-size: 30px; font-weight: 600;">
                <span id="cust2_label_${widgetModel.id}" style="font-family: 'SourceSansPro-Regular';"></span>
                <span style="display: inline-block; position: relative; font-size: 17px;font-family: 'SourceSansPro-Regular';  top: -7px; margin-left: -3px;">%</span>
            </div>
            <div style="position:absolute; top: 55%; width:100%;text-align: center;font-family: 'SourceSansPro-Regular'; color: #727272; font-size: 11px;">Complete</div>
            <div style="position:absolute; left:0px; top: 75%; font-size:13px; font-family: 'SourceSansPro-Regular';color: #727272;">0%</div>
            <div style="position:absolute; right:0px; top: 75%; font-size:13px; font-family: 'SourceSansPro-Regular';color: #727272;">100%</div>
        <div>
        `;
        cust3.modelChange(widgetModel, 'percentage', widgetModel.percentage)
    },

    modelChange: function(widgetModel, propertyChanged, propertyValue) {
        let degToRad = (deg) => {
            return Math.PI / 180 * deg
        }
        if (propertyChanged == 'percentage') {
            let percent = parseInt(propertyValue);
            var inter = setInterval(function() {
                if (document.getElementById(`cust2_label_${widgetModel.id}`) == null) {
                    console.log("CUSTOM WIDGET NULL");
                } else {
                    document.querySelector(`#cust2_label_${widgetModel.id}`).innerHTML = parseInt(propertyValue);
                    let canvas = document.querySelector(`#canvas2_${widgetModel.id}`);
                    let context = canvas.getContext('2d');
                    let percent = parseInt(propertyValue);
                    context.beginPath();
                    context.clearRect(0, 0, canvas.width, canvas.height)
                    context.arc(150, 150, 130, degToRad(-180 - 25), degToRad(25));
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
                        context.arc(150, 150, 130, degToRad(-180 - 25), degToRad((230/100*percent) - 180-25));
                        // context.arc(150, 150, 130, degToRad(-180 - 25), degToRad((270 / 100 * percent) - 245));
                        context.stroke();
                        context.closePath();
                    }
                    clearInterval(inter);
                }
            }, 500)
        }
    }
};