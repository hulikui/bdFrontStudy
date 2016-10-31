### 内置排序算法基础
* 内置函数sort排序算法  
* 注：如果调用该方法时没有使用参数，将按字母顺序对数组中的元素进行排序，说得更精确点，是按照字符编码的顺序进行排序
``` stylus
aqiData.sort(function (a, b) { // a 和 b 分别为 aqiData 对象中相邻的值
            return a[1] < b[1];//安装 元素中第二个元素的值 递增排序
        });
```

### [常用数组内置操作][1]
* str.split('').reverse().join('') 翻转字符串
* 数组元素的添加

``` stylus
arrayObj.push([item1 [item2 [. . . [itemN ]]]]); //将一个或多个新元素添加到数组结尾，并返回数组新长度
arrayObj.unshift([item1 [item2 [. . . [itemN ]]]]);//将一个或多个新元素添加到数组开始，数组中的元素自动后移，返回数组新长度
arrayObj.splice(insertPos,0,[item1[, item2[, . . . [,itemN]]]]);//将一个或多个新元素插入到数组的指定位置，插入位置的元素自动后移，返回""。
```
* 数组的删除

``` stylus
arrayObj.pop(); //移除最后一个元素并返回该元素值
arrayObj.shift(); //移除最前一个元素并返回该元素值，数组中元素自动前移
arrayObj.splice(deletePos,deleteCount); //删除从指定位置deletePos开始的指定数量deleteCount的元素，数组形式返回所移除的元素
```
* 数组的截取和合并

``` stylus
arrayObj.slice(start, [end]); //以数组的形式返回数组的一部分，注意不包括 end 对应的元素，如果省略 end 将复制 start 之后的所有元素
arrayObj.concat([item1[, item2[, . . . [,itemN]]]]); //将多个数组（也可以是字符串，或者是数组和字符串的混合）连接为一个数组，返回连接好的新的数组
```

* 数组的拷贝

``` stylus
arrayObj.slice(0); //返回数组的拷贝数组，注意是一个新的数组，不是指向
arrayObj.concat(); //返回数组的拷贝数组，注意是一个新的数组，不是指向
```
* 数组元素的排序

``` stylus
arrayObj.reverse(); //反转元素（最前的排到最后、最后的排到最前），返回数组地址
arrayObj.sort(); //对数组元素排序，返回数组地址
```
* 数组元素的字符串化

``` stylus
arrayObj.join(separator); //返回字符串，这个字符串将数组的每一个元素值连接在一起，中间用 separator 隔开。
toLocaleString 、toString 、valueOf：可以看作是join的特殊用法，不常用
```


### 经典排序算法
* 快速排序

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

* 冒泡排序

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