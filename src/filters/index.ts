// Set utils function parseTime to filter
export { parseTime } from '@/utils'

// Filter for article status
export const articleStatusFilter = (status: string) => {
  const statusMap: { [key: string]: string } = {
    published: 'success',
    draft: 'info',
    deleted: 'danger'
  }
  return statusMap[status]
}

// Filter to uppercase the first character
export const uppercaseFirstChar = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// 千分位过滤器
// 使用：<div>{{ ssss | thousandBitSeparator }}</div>
export const thousandBitSeparator = (value: string) => {
  return value && (value.toString().indexOf('.') !== -1 ?
    value.toString().replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
      return $1 + ',';
    }) :
    value.toString().replace(/(\d)(?=(\d{3})+$)/g, function ($0, $1) {
      return $1 + ',';
    }));
}
