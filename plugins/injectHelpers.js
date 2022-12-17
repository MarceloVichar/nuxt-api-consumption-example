import { get, isMatch } from 'lodash'

const setQuery = (context, queryString, value = null) => {
  if (typeof queryString === 'string' || queryString instanceof String) {
    queryString = { [queryString]: value }
  }
  const currentQueries = context.route.query
  const alreadyHasSameQueries = isMatch(currentQueries, queryString)
  if (alreadyHasSameQueries) {
    return
  }

  const { router } = context.app
  router.replace({ query: { ...currentQueries, ...queryString } })
}

const removeQuery = (context, queryStringKey) => {
  const { router } = context.app
  const currentQueries = context.route.query
  delete currentQueries[queryStringKey]

  router.replace({ query: currentQueries })
}

const getQuery = (context, queryStringKey, defaultValue = null) => {
  const currentQueries = context.route.query
  return currentQueries[queryStringKey] || defaultValue
}

export default (context, inject) => {
  inject('setQuery', (queryStrings, value = null) => setQuery(context, queryStrings, value))
  inject('getQuery', (queryStringKey, defaultValue = null) => getQuery(context, queryStringKey, defaultValue))
  inject('removeQuery', queryStringKey => removeQuery(context, queryStringKey))
  inject('hasQuery', (parameterName, value = null) => {
    const parameter = get(context.route.query, parameterName)
    if (!parameter) {
      return false
    }

    if (value === null) {
      return true
    }

    return parameter === value
  })
}
