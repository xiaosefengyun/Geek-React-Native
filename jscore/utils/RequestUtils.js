import DateUtils from './DateUtils';
const delay = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('timeout'));
    }, ms)
  });
}

const fetchWithTimeout = (timeout, ...args) => {
  return Promise.race([fetch(...args), delay(timeout)])
}

const RequestUtils = {
  API_DATE: 'http://gank.io/api/day/history',
  API_DAILY: 'http://gank.io/api/day/',

  getDateArray () {
    return fetchWithTimeout(10000, this.API_DATE).then(response => response.json());
  },

  async getContents (dateArray) {
    const proc = (date) => {
      const url = DateUtils.convertDate(this.API_DAILY + date);
      return fetchWithTimeout(10000, url)
      .then(response => response.json())
      .then(responseData => {
        responseData.date = date;
        return responseData
      });
    }

    return await Promise.all(dateArray.map(proc));
  }
}

module.exports = RequestUtils;
