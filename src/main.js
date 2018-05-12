import './rookie.tool';
import 'codemirror/lib/codemirror.css';
import 'github-markdown-css';
import './main.css';
import marked from 'marked';
import CodeMirror from 'codemirror';
import 'codemirror/mode/css/css';
import 'codemirror/mode/markdown/markdown';

var cssTheme = 'css';
var markdownTheme = 'markdown';
var cssContentBefore = `/* 小一点先 */
#cssEditor {
  height: 45vh;
  border: 1px solid;
  margin: .5em 1em;
}
/* 上点色 */
.cm-s-${cssTheme} .cm-builtin {\n  color: #30a;\n}
.cm-s-${cssTheme} .cm-number {\n  color: #164;\n}
.cm-s-${cssTheme} .cm-error {\n  color: #f00;\n}
.cm-s-${cssTheme} .cm-atom {\n  color: #219;\n}
.cm-s-${cssTheme} .cm-comment {\n  color: #a50;\n}
`;
var cssContentAfter = `/* 也上点色 */
.cm-s-${markdownTheme} .cm-header {\n  color: blue;\n}
.cm-s-${markdownTheme} .cm-quote {\n  color: #090;\n}
.cm-s-${markdownTheme} .cm-comment {\n  color: #a50;\n}
.cm-s-${markdownTheme} .cm-link {\n  color: #00c;\n}
.cm-s-${markdownTheme} .cm-string {\n  color: #a11;\n}
.cm-header {
  font-weight: bold;
}
`;
var cssContentEnd = `/* 加点样式 */
.markdown-body h1 {
  border-bottom: 1px solid #eaecef;
}
.markdown-body blockquote {
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
}
.markdown-body pre {
  background-color: #f6f8fa;
}
`;
var markdownContentBefore = `# show-code

> show-code project

## Build Setup

\`\`\` bash
# install dependencies
npm install

`;
var markdownContentAfter = `# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
\`\`\`

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
`;

(async () => {
  var style = document.createElement('style');
  document.head.append(style);
  var cssEditor = createCssEditor();
  await write(cssContentBefore, cssEditor, appendStyle);
  var mdEditor = createMdEditor();
  await delay(1000);
  await write(markdownContentBefore, mdEditor);
  await write(cssContentAfter, cssEditor, appendStyle);
  await delay(1000);
  await write(markdownContentAfter, mdEditor);
  await write(`/* markdown 转 HTML */\n`, cssEditor, appendStyle);
  await delay(1000);
  var mdContent = mdEditor.getValue();
  mdEditor.display.wrapper.remove();
  var mdEl = document.createElement('div');
  mdEl.id = 'mdHTML';
  mdEl.className = 'markdown-body';
  mdEl.innerHTML = marked(mdContent);
  document.body.append(mdEl);
  await write(cssContentEnd, cssEditor, appendStyle);

  function appendStyle(char) {
    style.innerHTML += char;
  }
})();

function createCssEditor() {
  var cssWrap = document.createElement('textarea');
  app.append(cssWrap);
  var cssEditor = CodeMirror.fromTextArea(cssWrap, {
    theme: cssTheme,
    matchBrackets: true,
    autoCloseBrackets: true,
    mode: 'text/css',
    lineWrapping: true
  });
  cssEditor.display.wrapper.id = 'cssEditor';
  cssEditor.display.wrapper.className += ' cm-css';
  return cssEditor;
}

function createMdEditor() {
  var markdownWrap = document.createElement('textarea');
  app.append(markdownWrap);
  var mdEditor = CodeMirror.fromTextArea(markdownWrap, {
    theme: markdownTheme,
    mode: 'markdown',
    extraKeys: { 'Enter': 'newlineAndIndentContinueMarkdownList' }
  });
  mdEditor.display.wrapper.id = 'mdEditor';
  mdEditor.display.wrapper.className += ' cm-markdown';
  return mdEditor;
}

async function write(content, editor, callback) {
  var curContent = editor.getValue();
  var i = 0, l = content.length, tmp = curContent;
  for (; i < l; i++) {
    await delay(10);
    tmp += content[i];
    editor.setValue(tmp);
    editor.setCursor(editor.lineCount());
    editor.focus();
    callback && callback(content[i]);
  }
}
