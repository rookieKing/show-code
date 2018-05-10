import './rookie.tool';
import 'codemirror/lib/codemirror.css';
import './main.css';
import CodeMirror from 'codemirror';
import 'codemirror/mode/css/css';
import 'codemirror/mode/markdown/markdown';
// import 'codemirror/mode/javascript/javascript';

var cssContentBefore = `/* 小一点先 */
#cssEditor {
  height: 45vh;
  border: 1px solid;
  margin: .5em 1em;
}
/* 上点色 */
.cm-s-default .cm-builtin {
  color: #30a;
}
.cm-s-default .cm-number {
  color: #164;
}
.cm-s-default .cm-error {
  color: #f00;
}
.cm-s-default .cm-atom {
  color: #219;
}
.cm-s-default .cm-comment {
  color: #a50;
}
/* TODO */
`;
var markdownContent = ``;
var cssWrap = document.createElement('textarea');
app.append(cssWrap);
// cssWrap.value = cssContent;

var cssEditor = CodeMirror.fromTextArea(cssWrap, {
  matchBrackets: true,
  autoCloseBrackets: true,
  mode: "text/css",
  lineWrapping: true
});
window.cssEditor = cssEditor;
cssEditor.display.wrapper.id = 'cssEditor';
var style = document.createElement('style');
document.head.append(style);
(async () => {
  await writeCss(cssContentBefore);
  
  // var markdownWrap = document.createElement('textarea');
  // app.append(markdownWrap);
  // cssEditor.setSize('auto', innerHeight);
  // var mdEditor = CodeMirror.fromTextArea(markdownWrap, {
  //   mode: 'markdown',
  //   extraKeys: { "Enter": "newlineAndIndentContinueMarkdownList" }
  // });
  // mdEditor.setValue(markdownContent);
})();

async function writeCss(content) {
  var i = 0, l = content.length, tmp = '';
  for (; i < l; i++) {
    await delay(33);
    tmp += content[i];
    cssEditor.setValue(tmp);
    cssEditor.setCursor(cssEditor.lineCount());
    cssEditor.focus();
    style.innerHTML = tmp;
    // cssWrap.value = tmp;
    // cssWrap.scrollTop = cssWrap.scrollHeight;
  }
}
