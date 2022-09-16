export const helpers = {
  methods: {
    toKebabCase(str) {
      return str.replace(/[\s_]+/g, '-').toLowerCase()
    },
    toTitleCase(str) {
      return str.replace(/-/g, ' ').replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1)
      })
    },
    formatValue(value, maximumFractionDigits = 4) {
      return parseFloat(value).toLocaleString(undefined, { maximumFractionDigits })
    }
  }
}
