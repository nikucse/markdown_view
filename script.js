// Set default markdown content
const defaultMarkdown = `# Welcome to Markdown Previewer
## This is a subheading
You can write **bold** or *italic* text.
### Lists
- Unordered list item 1
- Unordered list item 2
- Unordered list item 3

1. Ordered list item 1
2. Ordered list item 2
3. Ordered list item 3

### Links
[Visit GitHub](https://github.com)

### Code
Inline \`code\` example:

\`\`\`javascript
function helloWorld() {
    console.log("Hello, world!");
}
\`\`\`
`;

// Configure marked
marked.setOptions({
  breaks: true,
  highlight: function (code, lang) {
    if (typeof Prism !== 'undefined' && Prism.languages[lang]) {
      return Prism.highlight(code, Prism.languages[lang], lang);
    }
    return code;
  },
});

// Initialize elements
const editor = document.getElementById('editor');
const preview = document.getElementById('preview');
const clearBtn = document.getElementById('clear-btn');

document.addEventListener('DOMContentLoaded', function () {
  editor.value = defaultMarkdown;

  // Initial update
  updatePreview();
});

// Function to update preview
function updatePreview() {
  try {
    const markdownText = editor.value;
    const html = marked.parse(markdownText);
    preview.innerHTML = html;

    // Apply syntax highlighting if Prism is available
    if (typeof Prism !== 'undefined') {
      Prism.highlightAllUnder(preview);
    }
  } catch (error) {
    console.error('Error updating preview:', error);
    preview.innerHTML = '<p class="text-red-500">Error rendering preview</p>';
  }
}

// Event listeners
editor.addEventListener('input', updatePreview);
clearBtn.addEventListener('click', function () {
  editor.value = '';
  updatePreview();
  editor.focus();
});
