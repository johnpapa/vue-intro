export default function(text, maxlength) {
  const shortText = text.substring(1, maxlength);
  return `${shortText}...`;
}
