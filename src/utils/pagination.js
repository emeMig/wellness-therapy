const pagination = {
  /**
   * Generates the pagination query params
   * @param paginationData the pagination data to use to generate the pagination params
   * @return {string}
   */
  generatePagination: paginationData => {
    let queryParams = ''
    // check if pagination data exists
    if (paginationData) {
      let appender = '?'
      // if pagination data is defined
      if (paginationData.size) {
        // modify the url
        queryParams += appender + 'size=' + paginationData.size + '&page=' + paginationData.page
        appender = '&'
      }
      if (paginationData.sortBy) {
        queryParams += appender + 'sort=' + paginationData.sortBy
      }
    }
    return queryParams
  }
}

export default pagination
