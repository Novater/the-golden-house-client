import DOMPurify from 'dompurify';

export default class cleanHTML {
  static clean(dirtyHTML, [...ignoredTags], [...ignoredAttr]) {
    const ADD_TAGS = ignoredTags;
    const ADD_ATTR = ignoredAttr;
    return DOMPurify.sanitize(dirtyHTML, { ADD_TAGS, ADD_ATTR });
  }
}