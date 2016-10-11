/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var cityname = document.getElementById('aqi-city-input').value;
    var index = document.getElementById('aqi-value-input').value;
    var obj = {};
    obj[cityname]=index;
    aqiData = obj;
    console.log(aqiData);
}

/**
 * 渲染aqi-table表格
 */
function deleteNode(a) {
    a.remove();
}

function renderAqiList() {
    var row = document.createElement('tr');

    for (var key in aqiData) {
        row.innerHTML = '<td>'+key+'</td>' +
            '<td>'+aqiData[key]+'</td>' +
            '<td>' +
            '<button onclick="deleteNode(this.parentNode.parentNode)">删除</button>' +
            '</td>';
    }
    document.getElementById('aqi-table').appendChild(row)

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    if(!test()) return;
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
    // do sth.

    renderAqiList();
}

function test() {
    var cityname = document.getElementById('aqi-city-input').value;
    var template = /^[a-zA-Z\u4e00-\u9fa5]{1,20}$/;//new RegExp("^[\u4e00-\u9fa5]{2-20}$");
    var num = /^\d{1,4}$/;
    var index = document.getElementById('aqi-value-input').value;
    console.log(index);
    console.log('城市名', template.test(cityname));
    if(!template.test(cityname)){
        alert('城市名请输入中文');
        return false;
    }
    console.log('空气指数',num.test(index));
    if(!num.test(index)){
        alert('空气指数0-4位整数');
        return false;
    }
    return true;
}
function init() {
    var submit = document.getElementById('add-btn');
    submit.onclick = addBtnHandle;
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

}

setTimeout('init()', 1000);
