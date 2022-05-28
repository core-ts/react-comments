var __assign = (this && this.__assign) || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
};
import * as React from 'react';
import '../comment.css';
import { CommentItem } from './CommentItem';
export * from './CommentItem';
export var Comments = function (props) {
  var _a = React.useState([]), commentThreads = _a[0], setCommentThreads = _a[1];
  var _b = React.useState({
    nextPageToken: '',
    order: 'relevance'
  }), tools = _b[0], setTools = _b[1];
  React.useEffect(function () {
    (function () {
      if (props.videoId && props.getCommentThreads) {
        var oder_1 = props.order ? props.order : tools.order;
        props.getCommentThreads(props.videoId, oder_1).then(function (res) {
          setTools(function (prev) { return (__assign(__assign({}, prev), { nextPageToken: res.nextPageToken, order: oder_1 })); });
          setCommentThreads(res.list);
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var handleSort = function (e) {
    if (props.videoId && props.getCommentThreads) {
      var sort_1 = e.target.value;
      props.getCommentThreads(props.videoId, sort_1).then(function (res) {
        setTools(function (prev) { return (__assign(__assign({}, prev), { order: sort_1, nextPageToken: res.nextPageToken })); });
        setCommentThreads(res.list);
      });
    }
  };
  var loadMore = function () {
    if (props.videoId && props.getCommentThreads) {
      props.getCommentThreads(props.videoId, tools.order, 20, tools.nextPageToken).then(function (res) {
        setTools(function (prev) { return (__assign(__assign({}, prev), { nextPageToken: res.nextPageToken })); });
        var newThreads = __spreadArrays(commentThreads).concat(res.list);
        setCommentThreads(newThreads);
      });
    }
  };
  return (!props.getCommentThreads || !props.videoId ? null :
    React.createElement("div", { className: 'comment-threads-container' }, commentThreads && commentThreads.length > 0 && (React.createElement("div", null,
      React.createElement("div", { className: 'comments-bar' },
        React.createElement("h2", { className: 'comments-total' }, props.resource ? props.resource.comments : 'Comments'),
        React.createElement("select", { className: 'comments-sort btn button', onChange: handleSort, defaultValue: tools.order },
          React.createElement("option", { value: 'relevance' }, props.resource ? props.resource.top_comments : 'Top Comments'),
          React.createElement("option", { value: 'time' }, props.resource ? props.resource.newest_first : 'Newest First'))),
      commentThreads.map(function (comment) { return (React.createElement(CommentItem, { key: comment.id, commentId: comment.id, totalReplyCount: comment.totalReplyCount, authorProfileImageUrl: comment.authorProfileImageUrl, authorDisplayName: comment.authorDisplayName, likeCount: comment.likeCount, textDisplay: comment.textDisplay, getComments: props.getComments, resource: props.resource, format: props.format })); }),
      tools.nextPageToken && React.createElement("button", { type: 'button', id: 'btnMore', name: 'btnMore', className: 'btn-more', onClick: loadMore }, props.resource ? props.resource.button_more : 'More...')))));
};
