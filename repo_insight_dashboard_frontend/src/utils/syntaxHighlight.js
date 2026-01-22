function escapeHtml(s) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function highlightJavascript(code) {
  // Very small highlighter: keywords, strings, comments, numbers.
  let html = escapeHtml(code);

  // Comments
  html = html.replace(/(\/\/.*?$)/gm, '<span class="hl-comment">$1</span>');
  html = html.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="hl-comment">$1</span>');

  // Strings (single, double, template)
  html = html.replace(
    /(["'`])((?:\\.|(?!\1)[\s\S])*)\1/g,
    '<span class="hl-string">$1$2$1</span>'
  );

  // Numbers
  html = html.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="hl-number">$1</span>');

  // Keywords
  html = html.replace(
    /\b(const|let|var|function|return|export|default|import|from|if|else|for|while|class|new|try|catch|throw)\b/g,
    '<span class="hl-keyword">$1</span>'
  );

  return html;
}

function highlightJson(code) {
  let html = escapeHtml(code);

  // Strings
  html = html.replace(
    /(["])((?:\\.|(?!\1)[^\\\n])*)\1/g,
    '<span class="hl-string">"$2"</span>'
  );

  // Numbers
  html = html.replace(/\b(\d+(\.\d+)?)\b/g, '<span class="hl-number">$1</span>');

  // true/false/null
  html = html.replace(
    /\b(true|false|null)\b/g,
    '<span class="hl-keyword">$1</span>'
  );

  return html;
}

// PUBLIC_INTERFACE
export function highlightCode(code, language) {
  /** Convert code into lightly-highlighted HTML for safe insertion via dangerouslySetInnerHTML. */
  const safe = String(code || "");
  const lang = String(language || "").toLowerCase();

  if (lang === "javascript" || lang === "js") return highlightJavascript(safe);
  if (lang === "json") return highlightJson(safe);

  // For markdown/yaml/etc. just escape.
  return escapeHtml(safe);
}
