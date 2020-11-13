export const urlify = (text: string): string => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function (url) {
    const elipsis = url.length > 25 ? '...' : '';
    return '<a href="' + url + '" target="_blank">' + url.slice(0, 25) + elipsis + '</a>';
  });
};
