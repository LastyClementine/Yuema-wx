/**
 * Created by tidus on 2015/12/11.
 */

$(function() {

    $('#timeline').highcharts({

        chart: {
            type: 'columnrange',
            inverted: true
        },

        title: {
            text: ''
        },

        subtitle: {
            text: ''
        },

        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May','June']
        },

        yAxis: {
            title: {
                text: ''
            }
        },

        tooltip: {
            valueSuffix: ''
        },

        plotOptions: {
            columnrange: {
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return this.y + '时';
                    }
                }
            }
        },

        legend: {
            enabled: false
        },

        series: [{
            name: '空闲时间段',
            data: [
                [9, 11],
                [12, 16],
                [7, 15 ],
                [16, 22 ],
                [18, 22 ],
                [10, 20 ]
            ]
        }]

    });

});
