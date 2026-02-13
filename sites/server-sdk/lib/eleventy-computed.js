function urlSegment({ page }, index) {
  const pageUrl = page.url.substring(1);
  return (pageUrl && pageUrl.split('/')[index]) || undefined;
}

export function chapter(data) {
  return urlSegment(data, 0);
}

export function section(data) {
  return urlSegment(data, 1);
}
