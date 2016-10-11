/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};
function isWeek(a_date, b_date){
    var a = new Date(a_date);
    var b = new Date(b_date);
    var oneDayTime = 1000*60*60*24;
    var l_day =parseInt(a.getTime()/oneDayTime);
    var r_day =parseInt(b.getTime()/oneDayTime);//
    return parseInt((l_day+4)/7) == parseInt((r_day+4)/7);//因为1970年1月1 是周4   所以（天数+7）/7 取整 就是周数
}

function maxdayIndex() {
  var maxdayIndex = {
        "北京": 500,
        "上海": 300,
        "广州": 200,
        "深圳": 100,
        "成都": 300,
        "西安": 500,
        "福州": 100,
        "厦门": 100,
        "沈阳": 500
    };
    return maxdayIndex;
}

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: "北京",
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    var chart = document.getElementsByClassName('aqi-chart-wrap');
    chart[0].innerHTML = '';
    chart[0].style.width = "800px";
    chart[0].style.height = "600px";
    chart[0].style.background = "#eee";
    chart[0].style.display = 'flex';
    chart[0].style.alignItems = 'flex-end';
    chart[0].style.justifyContent = 'space-around';
    var length=0;
    for(var item in chartData.data){
        length ++;
    }
    for(var item in chartData.data){
        var col = document.createElement('div');

            var style = {
                background: "#ff0000",
                height: '' + (chartData.data[item] / chartData.maxIndex * 100) + '%',
                width: '' + (600 / length) + 'px'
            };
        console.log(style);
        col.title = item;
        col.style.background = style.background;
        col.style.height=style.height;
        col.style.width=style.width;
        col.style.float = 'left';
        col.style.marginBottom = 0;
        chart[0].appendChild(col);
    }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化
    var times = document.getElementsByName('gra-time');
    var selectTime = '';
    Array.prototype.forEach.call(times, function(time){
       if(time.checked){
           selectTime = time.value;
       }
    });
    pageState.nowGraTime = selectTime;

    // 设置对应数据
    initAqiChartData();
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    var city= document.getElementById("city-select");
    var citySelect = city.options[city.selectedIndex].innerText;
    pageState.nowSelectCity = citySelect;

    // 设置对应数据
    initAqiChartData();

    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    document.getElementById('form-gra-time').onchange = graTimeChange;
    document.getElementById('city-select').onchange = citySelectChange;
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    for(var a in aqiSourceData) {
        var opt = document.createElement('option');
        opt.innerText = a;
        document.getElementById('city-select').appendChild(opt);
    }

    // 给select设置事件，当选项发生变化时调用函数citySelectChange

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    console.log(chartData);
    console.log('selectTime', pageState);
    var city = pageState.nowSelectCity;
    var data = aqiSourceData[city];
    var array = Object.keys(data).map(function(k){
        return [k, data[k]];
    });
    if( pageState.nowGraTime === 'day') {
        console.log('day');
        chartData.data = data;
        chartData.maxIndex = maxdayIndex()[city];

    } else if (pageState.nowGraTime === 'week'){
        console.log('week');
        console.log(array);
        var weekdata = {};
        var startime = array[0][0];
        var weekcount = array[0][1];
        for(var i=1;i<array.length;i++){
            if(isWeek(array[i-1][0], array[i][0])){
                weekcount += array[i][1];
                if(i === array.length-1){//结算最后一项并且在同一周内的
                    console.log('---', array[i]);
                    var time = startime + '--' + array[i][0];
                    weekdata[time] = weekcount;
                }
            } else {
                var time = startime + '--' + array[i-1][0];
                startime = array[i][0];
                weekdata[time] = weekcount;
                weekcount = array[i][1];
            }
        }
        chartData.data = weekdata;
        chartData.maxIndex=maxdayIndex()[city]*7;
    } else {
        var monthdata = {};
        var startime = array[0][0];
        var monthcount = array[0][1];
        for(var i=1;i<array.length;i++){
            if(new Date(array[i-1][0]).getMonth() === new Date(array[i][0]).getMonth()){
                monthcount += array[i][1];
                if(i === array.length-1){//结算最后一项并且在一个月内的
                    var time = startime + '--' + array[i][0];
                    monthdata[time] = monthcount;
                }
            } else {
                var time = startime + '--' + array[i-1][0];
                startime = array[i][0];
                monthdata[time] = monthcount;
                monthcount = array[i][1];
            }
        }
        chartData.data = monthdata;
        chartData.maxIndex=maxdayIndex()[city]*31;
    }
    console.log(chartData);
    return chartData;
}

/**
 * 初始化函数
 */
function init() {
    console.log(aqiSourceData);
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

setTimeout('init()', 1000);