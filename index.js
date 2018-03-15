const IMLG = {
  INTERVAL_TIME_MS: 100,

  FETCH_TYPES: {
    video: true,
    photo: false,
  },
  POST_CLASSES: '_mck9w _gvoze _tn0ps',
  VIDEO_POST_CLASSES: 'coreSpriteVideoIconLarge',

  scrollPosition: 0,
  scroll: function() {
    IMLG.scrollPosition += 1000;
    window.scrollTo(0, IMLG.scrollPosition);
  },

  isPostTypeValid: function(node) {
    const videoIcons = node.getElementsByClassName(IMLG.VIDEO_POST_CLASSES);
    const postType = videoIcons.length ? 'video' : 'photo';
    return IMLG.FETCH_TYPES[postType];
  },

  postLinks: [],
  updateLinks: function() {
    const postElements = document.getElementsByClassName(IMLG.POST_CLASSES);
    const newLinks = Array.from(postElements)
      .filter(IMLG.isPostTypeValid)
      .map(function(node) {
        const postLink = node.getElementsByTagName('a')[0].href;
        const cleanLink = postLink.split('?')[0];
        return cleanLink;
      });
    IMLG.postLinks = IMLG.postLinks.concat(newLinks);
  },

  removeDuplicates: function() {
    const uniqueLinks = new Set(IMLG.postLinks);
    IMLG.postLinks = [...uniqueLinks];
  },

  loadPosts: function() {
    IMLG.scroll();
    IMLG.updateLinks();
    IMLG.removeDuplicates();
  },

  interval_id: null,
  interval_active: false,
  start: function() {
    IMLG.interval_active = true;
    IMLG.interval_id = IMLG.setIntervalMin(IMLG.loadPosts, IMLG.INTERVAL_TIME_MS);
    return undefined;
  },

  setIntervalMin: function(callback, delay) {
    if (!IMLG.interval_active) {
      return undefined;
    }
    const timeBefore = performance.now();

    callback();

    const remainingTime = delay - (performance.now() - timeBefore);
    setTimeout(function() {
      IMLG.setIntervalMin(callback, delay);
    }, remainingTime);
  },

  stopScrolling: function() {
    IMLG.interval_active = false;
  },

  finish: function() {
    IMLG.stopScrolling();
    IMLG.removeDuplicates();
    window.copy(IMLG.postLinks.join('\n'));
    console.log("Copied all posts' links to clipboard!");
  },
};

IMLG.start();
