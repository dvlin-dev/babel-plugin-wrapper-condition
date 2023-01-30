# babel-plugin-wrapper-dev
babel plugin wrapper condition  in dev

## Example
code:
```
  console.log(456)
```
will be converted to
```
if (process.env.NODE_ENV !== "production") {
    console.log(456)
}
```
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
      'babel-plugin-wrapper-dev',
      {
        nodeEnv: "NODE_ENV",
        deployState: "production"
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