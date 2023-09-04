// eslint-disabled
const ISPROD = process.env.NODE_ENV === 'production';
module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'next/core-web-vitals'
  ],
  env: {
    browser: true,
    node: true,
    es6: true
  },
  globals: {
    React: true
  },
  ignorePatterns: [
    '/tailwind.config.js',
    '/postcss.config.js'
  ],
  rules: {
    'react-hooks/exhaustive-deps': 'off',
    'linebreak-style': ['error', 'unix'], // 缩进风格
    'no-constant-condition': 'error', // 允许条件中的常量表达式。 if(true) 无意义
    'no-undef': 'error', // 对未声明变量的任何引用都会导致警告, 应该逐个检查，不应该全局关闭
    'no-fallthrough': 'error', // case中没有break的场景不应该全局关闭，特例单独处理
    'no-case-declarations': 'error', // switch case 中的变量提升
    'no-inner-declarations': ['error', 'functions'], // 禁止在嵌套的语句块中出现变量或 function
    // 禁止不必要的布尔类型转换
    'no-extra-boolean-cast': 'error', // 禁止不必要的布尔类型转换（no-extra-boolean-cast）  'extends': 'eslint:recommended' 属性启用了此规则。
    'no-unused-vars': ['off', { // 禁止未使用过的变量
      vars: 'all', // 检测所有变量，包括全局环境中的变量。这是默认值。
      args: 'none' // 不检查参数
    }],

    /*
     * 20220504 - v8.14.0
     * 文档地址： https://eslint.org/docs/rules/ + [rule]
     */
    'array-callback-return': ['error', { allowImplicit: true }], // 在数组方法的回调中强制执行 return 语句
    'no-await-in-loop': 'error', // 不允许await出现在循环体内
    'no-constructor-return': 'error', // 不允许在构造函数中返回值
    'no-duplicate-imports': 'off', // 合并同一模块下的多个导入
    'no-promise-executor-return': 'error', // 不允许从Promise执行return返回
    'no-self-compare': 'error', // 禁止自身与自身相比较 x === x
    'no-template-curly-in-string': 'error', // 不允许在常规字符串中使用模板文字占位符语法。(双引号中不能出现字符串模板)
    'no-unmodified-loop-condition': 'error', // 不允许未经修改的循环条件。死循环
    'no-unreachable-loop': 'error', // 禁止带有仅允许一次迭代的主体的循环o-confusing-arro
    'no-unused-private-class-members': ISPROD ? 'error' : 'off', // 允许Class中有未使用的属性或方法成员，存在开发人员预先定义结构的场景。 发布前校验
    'no-use-before-define': 'error', // 不允许在定义变量前使用变量 !!!
    'require-atomic-updates': 'error', // 在分配可能基于过时值的情况下报告错误，异步陷阱
    'accessor-pairs': 'error', // 提供setter的同时要提供getter，提供getter的同时可以不提供setter
    'arrow-body-style': 'off', // 箭头函数体在多行场景下使用大括号，单行情况下不允许使用大括号(关闭，单行内常出现类型说明)
    'block-scoped-var': 'error', // 不允许在块级作用域中使用var
    camelcase: 'error', // 命名变量时可以使用驼峰或者下划线
    'capitalized-comments': 'off', // 禁止注释的首字母大写
    'class-methods-use-this': ISPROD ? 'error' : 'off', // 强制类方法使用this,如果一个类方法不使用this，有时可以做成静态函数。 发布前校验
    complexity: ['error', 100], // 最大if else层数 上限10
    'consistent-return': 'error', // 要求使用一致的 return 语句
    'consistent-this': ['error', 'that'], // that 只能用来承接this
    curly: ['off', 'all'], // if, else 必须写大括号
    'default-case': 'error', // Switch 语句中必须有 Default 分支
    'default-case-last': 'error', // Switch 语句中的 Default 必须位于最后
    'default-param-last': 'off', // 函数中存在默认值的参数必须在最后，更规范的函数写法
    'dot-notation': 'error', // 能用.连接符取值时，优先使用.
    eqeqeq: ['error', 'always'], // 强制使用 === 和 !==
    'func-name-matching': 'off', // 不强制要求接收函数的变量与函数同名
    'func-names': ['error', 'never'], // 省略多余的函数命名
    'func-style': ['off'], // 对函数定义的方式不做要求
    'grouped-accessor-pairs': ['error', 'getBeforeSet'], // 相同属性的getter与setter需要相邻， getter要在setter之前
    'guard-for-in': 'off', // 不对 for in 进行原型链检查
    'id-denylist': 'off', // 禁止使用指定的标识符
    'id-length': ['off', { exceptions: ['t', 'h', 'i', 'v', 'x', 'y', 'z', 'j', 'k', 'r', 'g', 'b', 'a'] }], // 强制标识符的最小长度为2
    'max-depth': ['error', 4], // 强制块可以嵌套的最大深度
    'max-lines': ['error', 4000], // 每个文件的最大行数
    'max-lines-per-function': ['error', 500], // 单个函数最大行数
    'max-nested-callbacks': ['error', 5], // 强制回调函数最大嵌套深度
    'max-params': ['error', 10], // 限制函数定义中最大参数个数
    'max-statements': ['error', 100], // 块内最大语句数
    'multiline-comment-style': 'off', // 不强制对多行注释使用特定风格
    'new-cap': ['error', { // 要求构造函数首字母大写
      newIsCap: true, // 要求调用 new 操作符时有首字母大小的函数。
      capIsNew: false //  允许调用首字母大写的函数时没有 new 操作符
    }],
    'no-alert': 'error', // 不允许有alert，使用 debugger 进行断点调试
    'no-array-constructor': 'error', // Array通常不鼓励使用构造函数来构造一个新数组，而是使用数组字面量表示法
    'no-bitwise': 'off', // 不允许使用位运算符，确需使用的补充注释后可按行忽略
    'no-caller': 'error', // 禁用 caller 或 callee (no-caller)
    'no-confusing-arrow': [
      'error',
      { allowParens: true, onlyOneSimpleParam: false }
    ], // 禁止在可能与比较操作符相混淆的地方使用箭头函数
    'no-console': ISPROD ? 'error' : 'off', // 生产环境不能有console,开发环境可以有
    'no-continue': 'error', // 通过禁用continue提高代码健壮程度
    'no-else-return': 'off', // 允许在 else 前有 return
    'no-empty-function': 'off', // 不允许出现空函数，为空函数写一个清晰的注释是一个好习惯
    'no-eq-null': 'error', // 禁止与 null 进行 == 比较
    'no-eval': 'error', // 禁用 eval()
    'no-extend-native': 'error', // 禁止扩展原生对象
    'no-extra-bind': 'error', // 禁止不必要的函数绑定（bind方法）
    'no-extra-label': 'error', // 禁用不必要的标签
    'no-floating-decimal': 'error', // 小数点之前或之后必须有一个数字
    'no-implicit-coercion': 'error', // 禁止使用运算符实现类型转换
    'no-implicit-globals': 'error', // 不允许在全局范围内声明。避免使本地的变量“污染”全局变量
    'no-implied-eval': 'error', // 禁用隐式的eval()
    'no-inline-comments': 'off', // 允许行内注释
    'no-invalid-this': 'error', // 不允许类或类对象之外使用this
    'no-iterator': 'error', // 禁用迭代器
    'no-label-var': 'error', // 禁用与变量同名的标签
    'no-labels': 'error', // 禁用标签语句 默认都为false
    'no-lone-blocks': 'error', // 禁用不必要的嵌套块
    'no-lonely-if': 'error', // 禁止 if 语句作为唯一语句出现在 else 语句块中，应该合并为else if ()
    'no-loop-func': 'error', // 不允许在循环中编写使用函数
    'no-magic-numbers': ['off', { ignoreArrayIndexes: true, ignore: [0, 1, 2, 3, 200, 400, 401, 403, 404, 405, 500] }], // 禁止使用魔术数字, 暂时关闭
    'no-mixed-operators': 'off', // 可以混合使用规则
    'no-multi-assign': 'error', // 禁止连续赋值，难以阅读
    'no-multi-str': 'error', //  禁止多行字符串
    'no-negated-condition': 'off', // 避免先决条件是否定条件的情况，难以阅读
    'no-nested-ternary': 'off', // 可以使用嵌套三元表达式
    'no-new': 'error', // 避免单独使用new
    'no-new-func': 'error', // 禁用Function构造函数
    'no-new-object': 'error', // 禁止使用 Object 构造函数
    'no-new-wrappers': 'error', // 禁止原始包装实例
    'no-octal-escape': 'error', // 禁止在字符串字面量中使用八进制转义序列
    'no-param-reassign': 'off', // 允许函数内部修改入参
    'no-plusplus': 'off', // 允许++自增符号单独出现，除for循环内部。可以使用+=，-=替代
    'no-proto': 'error', // 禁用__proto__
    'no-restricted-exports': 'off', // 允许导出任意变量名
    // 'no-restricted-globals': [ // 变量保护
    //   'error',
    //   {
    //     name: '_Vue_',
    //     message: '全局变量保护，请勿占用.'
    //   }
    // ],
    'no-return-assign': ['error', 'except-parens'], // 禁止在返回语句中赋值  except-parens 禁止出现赋值语句，除非使用括号把它们括起来
    'no-return-await': 'error', // 禁用不必要的 return await
    'no-script-url': 'error', // 禁用 Script URL
    'no-sequences': 'error', // 不允许使用逗号操作符
    'no-shadow': 'off', // 禁止变量声明覆盖外层作用域的变量, 使用ts中的检查
    'no-ternary': 'off', // 允许使用三元运算
    'no-throw-literal': 'error', // 限制可以被抛出的异常
    'no-undef-init': 'off', // 允许初始化变量值为 undefined，部分场景undefined有特殊含义
    'no-undefined': 'off', // 允许 undefined作为标识符
    'no-underscore-dangle': 'off', // 允许 使用下划线作为标识符
    'no-unneeded-ternary': ['error', { // 禁止可以表达为更简单结构的三元操作符
      defaultAssignment: true // 禁止条件表达式作为默认的赋值模式
    }],
    'no-unused-expressions': ['error', { allowShortCircuit: true }], // 禁止未使用过的表达式
    'no-useless-call': 'error', // 禁用不必要的 .call() 和 .apply()
    'no-useless-computed-key': 'error', // 禁止在对象中使用不必要的计算属性
    'no-useless-concat': 'error', // 禁止没有必要的字符拼接 'a' + 'b'
    'no-useless-constructor': 'off', // 禁用不必要的构造函数
    'no-useless-rename': 'error', // 禁止在 import 和 export 时将引用重命名为相同的名字
    'no-useless-return': 'error', // 禁止无意义的 return
    'no-var': 'error', // 要求使用 let 或 const
    'no-void': 'error', // 禁止使用void操作符
    'object-shorthand': 'error', // 对象简写，单字母
    'one-var': 'off', // 对变量声明位置无限制
    'prefer-arrow-callback': ['error', { allowUnboundThis: false }], // 要求使用箭头函数作为回调
    'prefer-const': 'off', // 建议使用const
    'prefer-destructuring': 'off', // 优先使用数组和对象解构
    'prefer-exponentiation-operator': 'error', // 使用 ** 替换 Math.pow
    'prefer-object-has-own': 'error', // 使用 Object.hasOwn 替换 Object.hasOwnProperty
    'prefer-object-spread': 'error', // 限制Object的使用场景，尽可能使用对象扩展方式完成
    'prefer-rest-params': 'error', // 使用 ...args 收集参数，避免使用arguments
    'prefer-spread': 'error', // 建议使用扩展语法而非.apply()
    'prefer-template': 'error', // 建议使用模板字面量而非字符串连接
    'quote-props': ['error', 'as-needed'], // 属性前后按需添加双引号
    radix: ['error', 'as-needed'], // parseInt转换非10进制时，不省略第二个参数基数
    'require-await': 'off', // async 内部必须存在 await
    'spaced-comment': ['error', 'always', { // 要求或禁止在注释前有空白
      markers: ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ','] // 'markers'的值是一个字符串形式的数组，这些字符串也就是块级注释的标记
    }],
    strict: ['error', 'global'], // 只允许全局声明 use strict
    'vars-on-top': 'error', // var变量声明要位于顶部，手动进行变量提升
    yoda: 'error', // 不允许yoda表达式，判断条件中变量在前，值在后
    'array-bracket-newline': 'off', // 在数组开括号后和闭括号前强制换行
    'array-bracket-spacing': 'error', // 禁止在括号内使用空格，1.有空格var arr = [ 'foo', 'bar' ]; 2.无空格 var arr = ['foo', 'bar', 'baz'];
    'array-element-newline': 'off', // 数组元素换行风格
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: false }], // 要求箭头函数的参数使用圆括号
    'arrow-spacing': ['error', { // 箭头函数的箭头之前或之后有空格
      before: true,
      after: true
    }],
    'block-spacing': ['error', 'always'], // 代码块中开括号前和闭括号后有空格
    'brace-style': ['error', '1tbs', { // 大括号风格
      allowSingleLine: true // 允许左右大括号在同一行
    }],
    'comma-dangle': ['error', 'never'], // 不允许使用拖尾逗号，IE8报错
    'comma-spacing': ['error', { // 强制在逗号周围使用空格
      before: false,
      after: true
    }],
    'comma-style': ['error', 'last'], // 逗号样式
    'computed-property-spacing': 'error', // 禁止或强制在计算属性中使用空格
    'dot-location': ['error', 'property'], // 点操作符和属性放在同一行
    'eol-last': 'off', // 要求或禁止文件末尾保留一行空行
    'func-call-spacing': 'off', // 要求或禁止在函数标识符和其调用之间有空格
    'function-call-argument-newline': 'off', // 不强制要求函数调用参数换行
    'generator-star-spacing': ['error', { before: true, after: false }], // 强制 generator 函数中 * 号前面有空格
    'implicit-arrow-linebreak': 'error', // 强制隐式返回的箭头函数体的位置需在同一行
    indent: ['off', 2],
    'jsx-quotes': ['error', 'prefer-single'], // JSX 属性中使用一致的单引号
    'key-spacing': ['error', { // 对象文字属性中的键和值之间保持一致的间距
      beforeColon: false,
      afterColon: true
    }],
    'keyword-spacing': ['error', { // 强制关键字周围空格的一致性
      before: true,
      after: true
    }],
    'line-comment-position': 'off', // 行注释位置，可以在上面也可以在后面
    'lines-around-comment': ['error', {
      beforeBlockComment: false,
      beforeLineComment: false,
      allowBlockStart: true,
      allowClassStart: true,
      allowObjectStart: true
    }], // 强制注释周围有空行  后续开启
    'object-curly-newline': 'off', // 不对对象换行强制要求
    'lines-between-class-members': ['off', 'never'], // 禁止在类成员之间出现空行
    'max-len': ['error', { code: 20000 }], // 最大行长度
    'max-statements-per-line': ['error', { max: 3 }], // 每行最大语句数
    'new-parens': 'error', // 无参构造函数时带括号
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }], // 链式操作最大个数
    'no-extra-parens': ['off', 'functions'], // 禁止冗余的括号
    'no-multi-spaces': 'error', // 禁止出现多个空格
    'no-multiple-empty-lines': ['error', { // 不允许多个空行
      max: 1, // 强制最大连续空行数。
      maxEOF: 1, // 强制文件末尾的最大连续空行数
      maxBOF: 0 //  强制文件开始的最大连续空行数
    }],
    'no-trailing-spaces': 'off', // 不检查行尾空白
    'no-whitespace-before-property': 'error', // 禁止属性前有空白
    'nonblock-statement-body-position': ['error', 'beside'], // 强制单行语句在同一行
    'object-curly-spacing': ['error', 'always', { // 强制在花括号中使用一致的空格 always要求花括号内有空格 (除了 {})
      objectsInObjects: false
    }],
    'object-property-newline': 'off', // 对象属性强制换行
    'operator-linebreak': ['error', 'before'], // 运算符强制执行一致的换行样式, 在操作符之前放置换行符
    'padded-blocks': ['error', 'never'], // 禁止块语句和类的开始或末尾有空行
    quotes: ['error', 'single', { // 强制一致地使用反引号、双引号或单引号
      avoidEscape: true, // 允许字符串使用单引号或双引号，只要字符串中包含了一个其它引号，否则需要转义
      allowTemplateLiterals: true //  允许字符串使用反勾号
    }],
    'rest-spread-spacing': ['error', 'never'], // 展开运算符后面不允许跟空格： ... args
    semi: ['error', 'always'], // 分号检查
    // 'semi': 'off', // 不检查分号
    'semi-spacing': 'error', // 强制分号后有空格
    'semi-style': ['error', 'last'], // 强制分号的位置在末尾
    'space-before-blocks': ['error', 'always'], // 要求语句块之前的空格
    'space-before-function-paren': ['error', 'never'], // 禁止函数圆括号之前有一个空格
    'space-in-parens': ['error', 'never'], // 禁止括号内的空格 foo('bar');
    'space-infix-ops': 'error', // 要求操作符周围有空格
    'space-unary-ops': ['error', { // 要求或禁止在一元操作符之前或之后存在空格
      words: true, // 适用于单词类一元操作符 例如：new、delete、typeof、void、yield
      nonwords: false // 适用于这些一元操作符: -、+、--、++、!、!!
    }],
    'switch-colon-spacing': 'error', // 强制在 switch 的冒号左侧没有空格，右侧有空格
    'template-curly-spacing': ['error', 'never'], // 强制模板字符串中禁止花括号内出现空格 ${people.name}
    'wrap-iife': ['error', 'any'], // 需要把立即执行的函数包裹起来，不限制执行风格
    'yield-star-spacing': ['error', 'before'], //* 在 yield 表达式周围强制使用间距
    'no-debugger': ISPROD ? 'error' : 'off' // 禁用 debugger
  }
};
