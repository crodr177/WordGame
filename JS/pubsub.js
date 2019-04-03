var I = (function(){
  var events = {}

  function subscribe(event, fn) {
    if (events.hasOwnProperty(event)) {
      events[event].push(fn)
    } else {
      events[event] = [fn]
    }
  }

  function publish(event, data = {}) {
    if (events.hasOwnProperty(event)) {
      events[event].forEach(fn => fn(data))
    }
  }

  return {
    subscribe: subscribe,
    publish: publish
  }
}())