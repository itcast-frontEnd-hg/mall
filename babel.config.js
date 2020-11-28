module.exports = {
  // 这是环境预设的解码规则
  "presets": [
    '@vue/cli-plugin-babel/preset'
  ],
  // 这是辅助性的一些插件
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
}
