import sanitizer from 'sanitize-html';

const sanitizeHtml = (content) => {
  const sanitizedContent = sanitizer(content, {
    allowedTags: [
      'p',
      'span',
      'h1',
      'h2',
      'h3',
      'ul',
      'ol',
      'li',
      'blockquote',
      'strike',
      'pre',
      'code',
      'em',
      'strong',
      'br',
      'hr',
    ],
  });

  return sanitizedContent;
};

export { sanitizeHtml };
