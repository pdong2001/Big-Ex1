$(document).ready(function() {
    $('.root .rt').click(function() {
        var h = $(this).parent().find('ul').innerHeight();
        if ($(this).parent().find('.nodes').height() > 0) {
            h = 0;
        }
        $('.nodes').animate({
            height: '0px'
        }, 'fast');
        $(this).parent().find('.nodes').animate({
            height: h + 'px'
        }, 'fast');
    });
    loadChart();
});


function loadChart() {
    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "VISITS TRAFFIC"
        },
        axisX: {
            valueFormatString: "DD MMM,YY",
            fill: true
        },
        axisY: {
            title: "Lượng người dùng",
            suffix: "Visitor",
            fill: true
        },
        legend: {
            cursor: "pointer",
            fontSize: 16,
            itemclick: toggleDataSeries,
        },
        toolTip: {
            shared: true
        },
        data: [{
                name: "Total visits",
                type: "splineArea",
                yValueFormatString: "Visitor",
                showInLegend: true,
                dataPoints: [
                    { x: new Date(2020, 6, 23, 9), y: 210 },
                    { x: new Date(2020, 6, 24), y: 310 },
                    { x: new Date(2020, 6, 25), y: 310 },
                    { x: new Date(2020, 6, 26), y: 290 },
                    { x: new Date(2020, 6, 27), y: 290 },
                    { x: new Date(2020, 6, 28), y: 310 },
                    { x: new Date(2020, 6, 29), y: 308 },
                    { x: new Date(2020, 6, 30), y: 297 },
                    { x: new Date(2020, 7, 01), y: 290 },
                    { x: new Date(2020, 7, 02), y: 310 },
                    { x: new Date(2020, 7, 03), y: 308 },
                    { x: new Date(2020, 7, 04), y: 297 }
                ]
            },
            {
                name: "Unique visits",
                type: "splineArea",
                yValueFormatString: "Visitor",
                showInLegend: true,
                dataPoints: [
                    { x: new Date(2020, 6, 23, 9), y: 190 },
                    { x: new Date(2020, 6, 24), y: 272 },
                    { x: new Date(2020, 6, 25), y: 272 },
                    { x: new Date(2020, 6, 26), y: 251 },
                    { x: new Date(2020, 6, 27), y: 262 },
                    { x: new Date(2020, 6, 28), y: 252 },
                    { x: new Date(2020, 6, 29), y: 263 },
                    { x: new Date(2020, 6, 30), y: 256 },
                    { x: new Date(2020, 7, 01), y: 290 },
                    { x: new Date(2020, 7, 02), y: 310 },
                    { x: new Date(2020, 7, 03), y: 308 },
                    { x: new Date(2020, 7, 04), y: 297 }
                ]
            }
        ]
    });
    chart.render();

    function toggleDataSeries(e) {
        if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }
}