export default function(text, maxlength) {
  if (!text || text.length === 0) return '';

  const shortText = text.substring(0, maxlength);
  const dots = shortText.length < text.length ? '...' : '';
  return `${shortText}${dots}`;
}
