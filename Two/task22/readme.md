### [二叉树JS算法基础](https://segmentfault.com/a/1190000000740261#articleHeader12)
* 递归遍历
``` stylus
   //链式存储结构
    function BinaryTree(data, leftChild, rightChild) {
        this.data = data || null;
        // 左右孩子结点
        this.leftChild = leftChild || null;
        this.rightChild = rightChild || null;
    }
  // 链式存储结构的递归先序遍历
    BinaryTree.prototype.preOrderTraverse = function preOrderTraverse(visit) {
        visit(this.data);
        if (this.leftChild) preOrderTraverse.call(this.leftChild, visit);
        if (this.rightChild) preOrderTraverse.call(this.rightChild, visit);
    };

```
* 查找二叉树的实现
 * ![数据结构的定义][1]
 * ![查找树][2]

  [1]: ./1.jpg "1.jpg"
  [2]: ./2.jpg "2.jpg"

