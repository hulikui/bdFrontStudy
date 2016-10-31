## 响应式设计

``` stylus
@media (min-width:769px) {//屏幕宽度大于769px的时候
.col-md-1 {
    width: calc(8.3% - 20px);//宽度计算 calc(每行占比-x像素)
  }
}
@media (max-width:768px) {//屏幕宽度小于768px的时候
  .col-xs-1 {
    width: calc(8.3% - 20px);
  }
 }
```

