ICD = {
  INTERVAL_TIME_MS: 250,

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

  getLinksOnScreen: function() {
    const postElements = document.getElementsByClassName(ICD.POST_CLASSES);
    return Array.from(postElements)
      .filter(ICD.isPostTypeValid)
      .map(function(node) {
        const postLink = node.getElementsByTagName('a')[0].href;
        const cleanLink = postLink.split('?')[0];
        return cleanLink;
      });
  },

  removeDuplicates: function() {
    const uniqueLinks = new Set(ICD.postLinks);
    ICD.postLinks = [...uniqueLinks];
  },

  postLinks: [],
  loadPosts: function() {
    ICD.scroll();
    ICD.getLinksOnScreen().forEach(function(link) {
      ICD.postLinks.push(link);
    });
  },

  interval_id: null,
  start: function() {
    ICD.interval_id = setInterval(ICD.loadPosts, ICD.INTERVAL_TIME_MS);
    return undefined;
  },

  stopScrolling: function() {
    clearInterval(ICD.interval_id);

  },

  finish: function() {
    ICD.stopScrolling();
    ICD.removeDuplicates();
    window.copy(ICD.postLinks.join('\n'));
    console.log("Copied all posts' links to clipboard!");
  },
};

ICD.start();
