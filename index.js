ICD = {
  ACTIVE: false,
  INTERVAL_ID: null,
  INTERVAL_TIME_MS: 1000,
  SCROLLING_ELEMENT: document.getElementsByTagName('section')[0],

  scrollBottom: function() {
    window.scrollTo(0, ICD.SCROLLING_ELEMENT.scrollHeight);
  },

  start: function() {
    ICD.INTERVAL_ID = setInterval(ICD.scrollBottom, ICD.INTERVAL_TIME_MS)
  },

  stop: function() {
    clearInterval(ICD.INTERVAL_ID)
  },
}

ICD.start();
