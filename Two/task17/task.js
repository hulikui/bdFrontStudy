/* ���ݸ�ʽ��ʾ
 var aqiSourceData = {
 "����": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// �������������������ģ�����ɲ�������
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
    "����": randomBuildData(500),
    "�Ϻ�": randomBuildData(300),
    "����": randomBuildData(200),
    "����": randomBuildData(100),
    "�ɶ�": randomBuildData(300),
    "����": randomBuildData(500),
    "����": randomBuildData(100),
    "����": randomBuildData(100),
    "����": randomBuildData(500)
};
function isWeek(a_date, b_date){
    var a = new Date(a_date);
    var b = new Date(b_date);
    var oneDayTime = 1000*60*60*24;
    var l_day =parseInt(a.getTime()/oneDayTime);
    var r_day =parseInt(b.getTime()/oneDayTime);//
    return parseInt((l_day+4)/7) == parseInt((r_day+4)/7);//��Ϊ1970��1��1 ����4   ���ԣ�����+7��/7 ȡ�� ��������
}

function maxdayIndex() {
  var maxdayIndex = {
        "����": 500,
        "�Ϻ�": 300,
        "����": 200,
        "����": 100,
        "�ɶ�": 300,
        "����": 500,
        "����": 100,
        "����": 100,
        "����": 500
    };
    return maxdayIndex;
}

// ������Ⱦͼ�������
var chartData = {};

// ��¼��ǰҳ��ı�ѡ��
var pageState = {
    nowSelectCity: "����",
    nowGraTime: "day"
}

/**
 * ��Ⱦͼ��
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
 * �ա��ܡ��µ�radio�¼����ʱ�Ĵ�����
 */
function graTimeChange() {
    // ȷ���Ƿ�ѡ����˱仯
    var times = document.getElementsByName('gra-time');
    var selectTime = '';
    Array.prototype.forEach.call(times, function(time){
       if(time.checked){
           selectTime = time.value;
       }
    });
    pageState.nowGraTime = selectTime;

    // ���ö�Ӧ����
    initAqiChartData();
    // ����ͼ����Ⱦ����
    renderChart();
}

/**
 * select�����仯ʱ�Ĵ�����
 */
function citySelectChange() {
    // ȷ���Ƿ�ѡ����˱仯
    var city= document.getElementById("city-select");
    var citySelect = city.options[city.selectedIndex].innerText;
    pageState.nowSelectCity = citySelect;

    // ���ö�Ӧ����
    initAqiChartData();

    // ����ͼ����Ⱦ����
    renderChart();
}

/**
 * ��ʼ���ա��ܡ��µ�radio�¼��������ʱ�����ú���graTimeChange
 */
function initGraTimeForm() {
    document.getElementById('form-gra-time').onchange = graTimeChange;
    document.getElementById('city-select').onchange = citySelectChange;
}

/**
 * ��ʼ������Select����ѡ����е�ѡ��
 */
function initCitySelector() {
    // ��ȡaqiSourceData�еĳ��У�Ȼ������idΪcity-select�������б��е�ѡ��
    for(var a in aqiSourceData) {
        var opt = document.createElement('option');
        opt.innerText = a;
        document.getElementById('city-select').appendChild(opt);
    }

    // ��select�����¼�����ѡ����仯ʱ���ú���citySelectChange

}

/**
 * ��ʼ��ͼ����Ҫ�����ݸ�ʽ
 */
function initAqiChartData() {
    // ��ԭʼ��Դ���ݴ����ͼ����Ҫ�����ݸ�ʽ
    // ����õ����ݴ浽 chartData ��
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
                if(i === array.length-1){//�������һ�����ͬһ���ڵ�
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
                if(i === array.length-1){//�������һ�����һ�����ڵ�
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
 * ��ʼ������
 */
function init() {
    console.log(aqiSourceData);
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

setTimeout('init()', 1000);