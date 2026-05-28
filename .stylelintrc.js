export default {
    extends: [
        'stylelint-config-standard', // stylelint官方推荐配置标准, 如需修改请在rules添加配置
        'stylelint-config-recess-order' // 将相关属性声明按 Recess(Bootstrap) 规范排序：定位 → 盒模型 → 边框 → 背景 → 文字 → 动画/其他
    ],

    plugins: ['stylelint-less'],
    overrides: [
        {
            files: ['**/*.less'],
            customSyntax: 'postcss-less' // 支持 Less 语法
        }
    ],
    // rules: 其中添加重写和添加内容。可以通过将规则的值设置为 null 来关闭规则
    rules: {
        'selector-class-pattern': null, // 关闭选择器命名规则限制，例如：不强制类名遵循特定的命名规则（如 BEM 或 kebab-case）。
        'comment-empty-line-before': null, // 关闭注释前需要空行的规则，例如：注释上方可以没有空行。
        'declaration-empty-line-before': null, // 关闭声明前需要空行的规则，例如：多个 CSS 声明之间可以没有空行。
        'function-name-case': 'lower', // 强制函数名称小写，例如：`rgb`、`hsl` 必须为小写。
        'no-descending-specificity': null, // 关闭选择器的层级顺序限制，例如：可以允许低优先级选择器覆盖高优先级选择器。
        'no-invalid-double-slash-comments': null, // 允许使用 `//` 双斜线注释（非标准 CSS 注释，但在 SCSS、Less 等中常用）。
        'value-keyword-case': null, // 关闭值关键字的大小写限制，例如：`inherit` 或 `INHERIT` 都可以接受。
        'at-rule-no-unknown': null // 关闭未知 @ 规则的报错限制，例如：允许自定义 @规则或未被标准 CSS 支持的 @规则（如 SCSS 的 @mixin）。
    },
    // 忽略检测文件
    ignoreFiles: [
        '**/*.js',
        '**/*.jsx',
        '**/*.tsx',
        '**/*.ts',
        '**/*.json',
        'node_modules/**/*',
        'build/**/*',
        'dist/**/*',
        'src/assets/*'
    ]
};
