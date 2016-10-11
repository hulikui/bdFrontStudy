/**
 * aqiData���洢�û�����Ŀ���ָ������
 * ʾ����ʽ��
 * aqiData = {
 *    "����": 90,
 *    "�Ϻ�": 40
 * };
 */
var aqiData = {};

/**
 * ���û������л�ȡ���ݣ���aqiData������һ������
 * Ȼ����Ⱦaqi-list�б���������������
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
 * ��Ⱦaqi-table���
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
            '<button onclick="deleteNode(this.parentNode.parentNode)">ɾ��</button>' +
            '</td>';
    }
    document.getElementById('aqi-table').appendChild(row)

}

/**
 * ���add-btnʱ�Ĵ����߼�
 * ��ȡ�û����룬�������ݣ�������ҳ����ֵĸ���
 */
function addBtnHandle() {
    if(!test()) return;
    addAqiData();
    renderAqiList();
}

/**
 * �������ɾ����ť��ʱ��Ĵ����߼�
 * ��ȡ�ĸ��������ݱ�ɾ��ɾ�����ݣ����±����ʾ
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
    console.log('������', template.test(cityname));
    if(!template.test(cityname)){
        alert('����������������');
        return false;
    }
    console.log('����ָ��',num.test(index));
    if(!num.test(index)){
        alert('����ָ��0-4λ����');
        return false;
    }
    return true;
}
function init() {
    var submit = document.getElementById('add-btn');
    submit.onclick = addBtnHandle;
    // ���������add-btn��һ������¼������ʱ����addBtnHandle����

    // ��취��aqi-table�е�����ɾ����ť���¼�������delBtnHandle����

}

setTimeout('init()', 1000);
