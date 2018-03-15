const ICD = {
  INTERVAL_TIME_MS: 100,

  FETCH_TYPES: {
    video: true,
    photo: false,
  },
  POST_CLASSES: '_mck9w _gvoze _tn0ps',
  VIDEO_POST_CLASSES: 'coreSpriteVideoIconLarge',

  scrollPosition: 0,
  scroll: function() {
    ICD.scrollPosition += 1000;
    window.scrollTo(0, ICD.scrollPosition);
  },

  isPostTypeValid: function(node) {
    const videoIcons = node.getElementsByClassName(ICD.VIDEO_POST_CLASSES);
    const postType = videoIcons.length ? 'video' : 'photo';
    return ICD.FETCH_TYPES[postType];
  },

  postLinks: [],
  updateLinks: function() {
    const postElements = document.getElementsByClassName(ICD.POST_CLASSES);
    const newLinks = Array.from(postElements)
      .filter(ICD.isPostTypeValid)
      .map(function(node) {
        const postLink = node.getElementsByTagName('a')[0].href;
        const cleanLink = postLink.split('?')[0];
        return cleanLink;
      });
    ICD.postLinks = ICD.postLinks.concat(newLinks);
  },

  removeDuplicates: function() {
    const uniqueLinks = new Set(ICD.postLinks);
    ICD.postLinks = [...uniqueLinks];
  },

  loadPosts: function() {
    ICD.scroll();
    ICD.updateLinks();
    ICD.removeDuplicates();
  },

  interval_id: null,
  interval_active: false,
  start: function() {
    ICD.interval_active = true;
    ICD.interval_id = ICD.setIntervalMin(ICD.loadPosts, ICD.INTERVAL_TIME_MS);
    return undefined;
  },

  setIntervalMin: function(callback, delay) {
    if (!ICD.interval_active) {
      return undefined;
    }
    const timeBefore = performance.now();

    callback();

    const remainingTime = delay - (performance.now() - timeBefore);
    setTimeout(function() {
      ICD.setIntervalMin(callback, delay);
    }, remainingTime);
  },

  stopScrolling: function() {
    ICD.interval_active = false;
  },

  finish: function() {
    ICD.stopScrolling();
    ICD.removeDuplicates();
    window.copy(ICD.postLinks.join('\n'));
    console.log("Copied all posts' links to clipboard!");
  },
};

ICD.start();
ICD.finish();
