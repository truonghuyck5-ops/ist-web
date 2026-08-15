const vietnameseDateFormatter = new Intl.DateTimeFormat('vi-VN', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
})

export function formatBlogDate(date) {
  return vietnameseDateFormatter.format(date)
}
