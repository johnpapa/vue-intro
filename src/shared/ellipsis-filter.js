export default function(text, maxlength) {
  const shortText = text.substring(0, maxlength);
  const dots = shortText.length < text.length ? '...' : '';
  return `${shortText}${dots}`;
}
