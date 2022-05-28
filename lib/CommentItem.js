var __spreadArrays = (this && this.__spreadArrays) || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
};
import * as React from 'react';
export function CommentItem(props) {
  var _a = React.useState([]), comments = _a[0], setComments = _a[1];
  var _b = React.useState(false), show = _b[0], setShow = _b[1];
  var _c = React.useState(), nextPage = _c[0], setNextPage = _c[1];
  React.useEffect(function () {
    getMoreComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);
  var getMoreComment = function () {
    if (props.getComments && props.commentId && show && !comments.length) {
      var m = (props.max && props.max > 0 ? props.max : 5);
      props.getComments(props.commentId, m).then(function (res) {
        setNextPage(res.nextPageToken);
        setComments(res.list);
      });
    }
  };
  var handleShowMore = function () {
    setShow(!show);
  };
  var loadMore = function (id) {
    if (props.getComments) {
      var m = (props.max && props.max > 0 ? props.max : 5);
      props.getComments(id, m, nextPage).then(function (res) {
        setNextPage(res.nextPageToken);
        var newList = __spreadArrays(comments).concat(res.list);
        setComments(newList);
      });
    }
  };
  return (!props.commentId || props.commentId.length === 0 ? null :
    React.createElement("div", { className: 'row comments' },
      React.createElement("div", { className: 'col s12 m2 l2 xl1' },
        React.createElement("div", { className: 'img-user' },
          React.createElement("img", { src: props.authorProfileImageUrl, alt: 'Author Profile' }))),
      React.createElement("div", { className: 'col s12 m10 l10 xl11' },
        React.createElement("h3", { className: 'author' }, props.authorDisplayName),
        React.createElement("p", { dangerouslySetInnerHTML: { __html: props.textDisplay } }),
        !props.likeCount || props.likeCount <= 0 ? null : React.createElement("h5", null,
          props.resource ? props.resource.like : 'Like',
          ": ",
          props.likeCount),
        !props.getComments || !props.totalReplyCount || props.totalReplyCount === 0 ? null :
          React.createElement("button", { className: 'view', onClick: handleShowMore }, show ? props.format && props.resource ? props.format(props.resource.hide_replies, props.totalReplyCount) : "Hide " + props.totalReplyCount + " replies" : props.format && props.resource ? props.format(props.resource.view_replies, props.totalReplyCount) : "View " + props.totalReplyCount + " replies"),
        !props.getComments || !show ? null : comments.map(function (c) { return (React.createElement(CommentItem, { key: c.id, commentId: c.id, authorProfileImageUrl: c.authorProfileImageUrl, authorDisplayName: c.authorDisplayName, likeCount: c.likeCount, textDisplay: c.textDisplay })); }),
        show && nextPage &&
        React.createElement("button", { className: 'view', onClick: function () { return loadMore(props.commentId); } }, props.resource ? props.resource.view_more_replies : 'View more replies'))));
}
