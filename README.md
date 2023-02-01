# babel-plugin-wrapper-condition
english / [中文](https://github.com/bowlingQ/babel-plugin-wrapper-condition/blob/main/README_CN.md)

A babel plug-in that wraps the code with conditional statements, which is usually used to kill the local debugging code in the online environment
## Example
code:
```
  console.log(456)

  // wrapper
  1 + 1 === 1
```
will be converted to
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
   Whether the code should be judged in the external package condition of `console.log`. (Defaults to `true`.)
- `nodeEnv` 
  As shown in the above example, it is a placeholder for `process.env.${nodeEnv} !== "${deployState}"` (Defaults to `NODE_ENV`.)
- `deployState`
  As shown in the above example, it is a placeholder for `process.env.${nodeEnv} !== "${deployState}"` (Defaults to `production`.)
- `comment`
  Whether to enable comments.`// warpper` will take effect only when it is true, it works with `commentField`, the code block below is wrapped by the condition code when it is true, Note that It is only effective for expression  (Defaults to `false`.)
  
  ```
  expression :
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
  This field determines whether the code block below is wrapped by the condition code(Defaults to `wrapper`.)
 

## Usage
you should transmit `nodeEnv` and `production` to wrapper your `log`
```
if (process.env.${nodeEnv} !== "${deployState}") {
  your log
}
```

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



## example code 
```
cd example && node code.js   

or

export NODE_ENV='production'  && cd example && node index.js

export NODE_ENV='dev'  && cd example && node index.js

```