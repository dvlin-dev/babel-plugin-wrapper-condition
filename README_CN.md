# babel-plugin-wrapper-condition
[english](https://github.com/bowlingQ/babel-plugin-wrapper-condition/blob/main/README.md) / 中文

一个用条件语句来包裹代码的 babel 插件，通常用于将本地调试代码扼杀在线上环境
## Example
使用之前的代码:
```
console.log(456)

// wrapper
1 + 1 === 1
```
使用之后将转换为
```
if (process.env.NODE_ENV !== "production") {
    console.log(456)
}
// wrapper
if (process.env.NODE_ENV !== "production") {
    1 + 1 === 1
}

```

## Parameters 

- `wrapperlog`
   是否自动对`console.log`外部包裹条件判断语句，让其在指定的环境运行。(默认值 `true`)
- `nodeEnv` 
  参考上述案例，他是 env 的一个环境变量，作为条件判断语句 `process.env.${nodeEnv} !== "${deployState}"` 中 `nodeEnv` 的占位符。(默认值`NODE_ENV`)
- `deployState`
  参考上述案例，他是项目运行的环境值，作为条件判断语句 `process.env.${nodeEnv} !== "${deployState}"`中`deployState`的占位符。(默认值 `production`)
- `comment`
  是否启用注释。参考上述案例，只有他的值为 true 时，有`// warpper` 注释的表达式才会被包裹条件判断语句，它与`commentField` 配合使用，注意！它只对表达式有效。(默认值 `false`)
  
  ```
  表达式 :
      [1,2,3]
      a = 1
      1 + 2;
      -1;
      function(){};
      () => {};
      class{};
      a;
      this;
      super;
      a::b;
  ```
- `commentField`
  当表示的注释值包含 `commentField` 时，它的代码块才会被条件代码包裹。(默认值`wrapper`)
 

## 用法

**Via .babelrc (Recommended)** 

.babelrc.json
```
{
  "plugins": [
    [
      'babel-plugin-wrapper-condition',
      {
        wrapperlog: true,
        nodeEnv: "NODE_ENV",
        deployState: "production",
        comment: true,
        commentField: 'ONLE_IN_PROD'
      }
    ]
  ],
}
```



## 代码案例
example 文件夹
```
cd example && node code.js   

or

export NODE_ENV='production'  && cd example && node index.js

export NODE_ENV='dev'  && cd example && node index.js

```