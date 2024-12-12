export default {
  minHeight: '200px',
  useCommandShortcut: true,
  usageStatistics: true,
  hideModeSwitch: false,
  initialEditType: 'wysiwyg',
  previewStyle: 'vertical',
  toolbarItems: [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task', 'indent', 'outdent'],
    ['table', 'image', 'link'],
    ['code', 'codeblock'],
    ['scrollSync']
  ]
}

// EditorOptions.ts (or another appropriate filename)

export interface EditorOptions {
  minHeight: string
  useCommandShortcut: boolean
  usageStatistics: boolean
  hideModeSwitch: boolean
  initialEditType: string
  previewStyle: string
  toolbarItems: string[][]
}

export interface Article {
  id: number
  abstractContent: string
  author: string
  disableComment: boolean
  version: number
  imageURL: string | null
  pageviews: number
  title: string
  timestamp: number
  status: boolean
  uniqueIdentifier: string
  markdownContent: string
}

export const defaultArticle: Article = {
  id: 0,
  abstractContent: '',
  author: '',
  disableComment: false,
  version: 0,
  imageURL: '',
  pageviews: 0,
  title: '未命名',
  timestamp: 0,
  status: false,
  uniqueIdentifier: '',
  markdownContent: ''
}
