### [������JS�㷨����](https://segmentfault.com/a/1190000000740261#articleHeader12)
* �ݹ����
``` stylus
   //��ʽ�洢�ṹ
    function BinaryTree(data, leftChild, rightChild) {
        this.data = data || null;
        // ���Һ��ӽ��
        this.leftChild = leftChild || null;
        this.rightChild = rightChild || null;
    }
  // ��ʽ�洢�ṹ�ĵݹ��������
    BinaryTree.prototype.preOrderTraverse = function preOrderTraverse(visit) {
        visit(this.data);
        if (this.leftChild) preOrderTraverse.call(this.leftChild, visit);
        if (this.rightChild) preOrderTraverse.call(this.rightChild, visit);
    };

```
* ���Ҷ�������ʵ��
 * ![���ݽṹ�Ķ���][1]
 * ![������][2]

  [1]: ./1.jpg "1.jpg"
  [2]: ./2.jpg "2.jpg"

