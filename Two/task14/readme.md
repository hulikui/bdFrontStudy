### ���������㷨����
* ���ú���sort�����㷨  
* ע��������ø÷���ʱû��ʹ�ò�����������ĸ˳��������е�Ԫ�ؽ�������˵�ø���ȷ�㣬�ǰ����ַ������˳���������
``` stylus
aqiData.sort(function (a, b) { // a �� b �ֱ�Ϊ aqiData ���������ڵ�ֵ
            return a[1] < b[1];//��װ Ԫ���еڶ���Ԫ�ص�ֵ ��������
        });
```

### [�����������ò���][1]
* str.split('').reverse().join('') ��ת�ַ���
* ����Ԫ�ص����

``` stylus
arrayObj.push([item1 [item2 [. . . [itemN ]]]]); //��һ��������Ԫ����ӵ������β�������������³���
arrayObj.unshift([item1 [item2 [. . . [itemN ]]]]);//��һ��������Ԫ����ӵ����鿪ʼ�������е�Ԫ���Զ����ƣ����������³���
arrayObj.splice(insertPos,0,[item1[, item2[, . . . [,itemN]]]]);//��һ��������Ԫ�ز��뵽�����ָ��λ�ã�����λ�õ�Ԫ���Զ����ƣ�����""��
```
* �����ɾ��

``` stylus
arrayObj.pop(); //�Ƴ����һ��Ԫ�ز����ظ�Ԫ��ֵ
arrayObj.shift(); //�Ƴ���ǰһ��Ԫ�ز����ظ�Ԫ��ֵ��������Ԫ���Զ�ǰ��
arrayObj.splice(deletePos,deleteCount); //ɾ����ָ��λ��deletePos��ʼ��ָ������deleteCount��Ԫ�أ�������ʽ�������Ƴ���Ԫ��
```
* ����Ľ�ȡ�ͺϲ�

``` stylus
arrayObj.slice(start, [end]); //���������ʽ���������һ���֣�ע�ⲻ���� end ��Ӧ��Ԫ�أ����ʡ�� end ������ start ֮�������Ԫ��
arrayObj.concat([item1[, item2[, . . . [,itemN]]]]); //��������飨Ҳ�������ַ�����������������ַ����Ļ�ϣ�����Ϊһ�����飬�������Ӻõ��µ�����
```

* ����Ŀ���

``` stylus
arrayObj.slice(0); //��������Ŀ������飬ע����һ���µ����飬����ָ��
arrayObj.concat(); //��������Ŀ������飬ע����һ���µ����飬����ָ��
```
* ����Ԫ�ص�����

``` stylus
arrayObj.reverse(); //��תԪ�أ���ǰ���ŵ���������ŵ���ǰ�������������ַ
arrayObj.sort(); //������Ԫ�����򣬷��������ַ
```
* ����Ԫ�ص��ַ�����

``` stylus
arrayObj.join(separator); //�����ַ���������ַ����������ÿһ��Ԫ��ֵ������һ���м��� separator ������
toLocaleString ��toString ��valueOf�����Կ�����join�������÷���������
```


### ���������㷨
* ��������

``` stylus
 function quickSort(arr){
            if(arr.length<=1){
                return arr;
            }
            let leftArr = [];
            let rightArr = [];
            let q = arr[0];
            for(let i= 1,l=arr.length;i<l;i++){
                if(arr[i]>q){
                    rightArr.push(arr[i]);
                }else{
                    leftArr.push(arr[i]);
                }
            }
            return [].concat(quickSort(leftArr), [q], quickSort(rightArr));
        }
```

* ð������

``` stylus
function bubbleSort(arr) {
            for(let i= 0,l=arr.length;i<l;i++){
                for(let j=0;j<l-i-1;j++){
                    if(arr[j]>arr[j+1]){
                        let temp = arr[j];
                        arr[j] = arr[j+1];
                        arr[j+1] = temp;
                    }
                }
            }
        }
```


  [1]: http://blog.csdn.net/xcxinghai/article/details/13502583