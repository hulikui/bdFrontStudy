### A star �㷨ǳ��
* f(n)= g(n) + h(n) g(n)ΪĿǰ�ڵ㵽��ʼ�ڵ�����Ĳ�����h(n)Ϊ��ʼ�ڵ㵽Ŀ��ڵ�Ĺ�����룬�㷨������ȡ����h(n)
* [�㷨����ԭ�����][1]

### canvas���A*�㷨˼·
* ��������
  
``` undefined
1�� �����ص������Ļ��С ӳ���һ����ά����, һ�������Ԫ�ص�λ������Ϊһ����λ��ÿ��Ԫ�ذ����󱣴棻
2�� ������ɵķ����ϰ��������Ͳ�������������������ӳ�䵽��ά������ ֵΪ1��
3�� �洢start �� starget ���꣬��ʼ����·��
4�� �ķ�������������f(n)�����open���飬��ǰ�ڵ����closed����
5�� ����һ�����㷨���������㷨���������Сf(n)�Ľڵ㣬�ѵ�ǰ����Ϊ�ýڵ�ĸ��ڵ㣬�ٰѸýڵ���Ϊ��ǰ�ڵ㣻
6�� �ظ�4-5����
7�� ���������h(n)===1��ʱ�����ѭ��
8�� ����closed�����Լ�target�ĸ��ڵ�׷�ٳ�����·��path
9�� ����path��Ⱦҳ���ý�ɫ�����ƶ�
```

### �����Ż�

``` stylus
1�� ʵʱ�洢��ǰλ�ýڵ㣻
2�� ����� �µ�target�Ľڵ� ���¼���·������Ⱦ
```


  [1]: http://www.cnblogs.com/zhoug2020/p/3468167.html