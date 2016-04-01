;(function (doc) {
  window.addEventListener('load', function apiOnDomReady () {
    var loading = doc.querySelector('.loading'),
      input = 'zacanger'
      token = Url.queryString('token')

    if (!input) {
      return
    }

    var token = Url.queryString('token') || undefined
    if (token) {
      input = Url.queryString('input')
    }

    loading.classList.add('visible')

    function getStats (input, callback) {
      var fromLocalStorage = localStorage[input]
      try {
        fromLocalStorage = JSON.parse(fromLocalStorage)
      } catch (e) {
        fromLocalStorage = null
      }

      if (Array.isArray(fromLocalStorage)) {
        return callback(null, fromLocalStorage)
      }

      var polyglot = new GitHubPolyglot(input, token),
        func = polyglot.userStats

      if (localStorage[input]) {
        return callback(null, localStorage[input])
      }

      if (polyglot.repo) {
        func = polyglot.repoStats
      }

      func.call(polyglot, function (err, stats) {
        if (err) {
          return callback(err)
        }
        try {
          localStorage[input] = JSON.stringify(stats)
        } catch (e) {
          localStorage.clear()
        }
        callback(null, stats)
      })
    }

    getStats(input, function (err, stats) {
      loading.classList.remove('visible')
      stats.sort(function (a, b) {
        return a.value < b.value ? 1 : -1
      }).forEach(function (c) {
        c.title = c.label
        delete c.label
      })
      drawPieChart.call(doc.querySelector('#pieChart'), stats, {
        legend: true
      })
    })
  })
})(document)

