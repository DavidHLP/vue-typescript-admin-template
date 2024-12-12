<template>
  <div :id="id"></div>
</template>

<script lang="ts">
import 'prismjs/themes/prism.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import 'codemirror/lib/codemirror.css' // Editor's Dependency Style
import '@toast-ui/editor/dist/toastui-editor.css' // Editor's Style
import Viewer from '@toast-ui/editor/dist/toastui-editor-viewer'
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import defaultOptions, { EditorOptions } from './default-options'

const defaultId = () =>
  'markdown-editor-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')

@Component({
  name: 'MarkdownViewer'
})
export default class MarkdownDemo extends Vue {
  @Prop({ required: true }) private initialValue!: string
  @Prop({ default: defaultId }) private id!: string
  @Prop({ default: () => defaultOptions }) private options!: EditorOptions
  @Prop({ default: 'markdown' }) private mode!: string
  @Prop({ default: '300px' }) private height!: string
  @Prop({ default: 'en' }) private language!: string

  private viewer:Viewer;

  @Watch('language')
  private onLanguageChange() {
    this.destroyEditor()
    this.initEditor()
  }

  @Watch('height')
  private onHeightChange(value: string) {
    if (this.markdownEditor) {
      this.markdownEditor.height(value)
    }
  }

  @Watch('mode')
  private onModeChange(value: string) {
    if (this.markdownEditor) {
      this.markdownEditor.changeMode(value)
    }
  }

  public setMarkdown(value: string) {
    if (this.viewer) {
      this.viewer.setMarkdown(value)
    }
  }

  // 在 mounted 钩子中初始化 Viewer
  mounted() {
    this.viewer = new Viewer({
      el: document.getElementById(this.id),
      ...this.options,
      height: '600px',
      initialValue: this.initialValue,
      plugins: [codeSyntaxHighlight]

    })
  }
}
</script>

<style scoped>
/* 样式可以根据需要调整 */
#viewer {
  width: 100%;
  margin-top: 20px;
}
</style>
