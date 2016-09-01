const DateUtils = {
  convertDate (date: string) {
    return date.replace(new RegExp('-', 'g'), '/')
  },
  getCurrentDate () {
    return new Date().Format('yyyy/MM/dd')
  },
  extendDate () {
    Date.prototype.Format = function (fmt) {
      var o = {
        'm+': this.getMonth() + 1,
        'd+': this.getDate(),
        'h+': this.getHours(),
        'm+': this.getMinutes(),
        's+': this.getSeconds(),
        'q+': Math.floor((this.getMonth() + 3) / 3),
        'S': this.getMilliseconds()
      }
      if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt))  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
      return fmt;
    }
  }
}

DateUtils.extendDate();

module.exports = DateUtils;
