import * as React from 'react';
import { Comment, ListResult, StringMap } from './model';

export interface CommentProps {
  commentId: string;
  totalReplyCount?: number;
  authorProfileImageUrl: string;
  authorDisplayName: string;
  likeCount: number;
  textDisplay: string;
  max?: number;
  resource?: StringMap;
  getComments?: (
    id: string,
    max?: number,
    nextPageToken?: string
  ) => Promise<ListResult<Comment>>;
}

export function CommentItem(props: CommentProps): any {
  const [comments, setComments] = React.useState<Comment[]>([]);
  const [show, setShow] = React.useState(false);
  const [nextPage, setNextPage] = React.useState<string>();
  React.useEffect(() => {
    getMoreComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const getMoreComment = () => {
    if (props.getComments && props.commentId && show && !comments.length) {
      const m = (props.max && props.max > 0 ? props.max : 5);
      props.getComments(props.commentId, m).then(res => {
        setNextPage(res.nextPageToken);
        setComments(res.list);
      });
    }
  };

  const handleShowMore = () => {
    setShow(!show);
  };

  const loadMore = (id: string) => {
    if (props.getComments) {
      const m = (props.max && props.max > 0 ? props.max : 5);
      props.getComments(id, m, nextPage).then(res => {
        setNextPage(res.nextPageToken);
        const newList = [...comments].concat(res.list);
        setComments(newList);
      });
    }
  };
  return (React.createElement("div", { className: 'row comments' },
        React.createElement("div", { className: 'col s12 m2 l2 xl1' },
            React.createElement("div", { className: 'img-user' },
                React.createElement("img", { src: props.authorProfileImageUrl, alt: 'Author Profile' }))),
        React.createElement("div", { className: 'col s12 m10 l10 xl11' },
            React.createElement("h3", { className: 'author' }, props.authorDisplayName),
            React.createElement("p", { dangerouslySetInnerHTML: { __html: props.textDisplay } }),
            React.createElement("h5", null,
                props.resource ? props.resource.like : 'Like',
                ": ",
                props.likeCount),
            props.totalReplyCount && props.totalReplyCount > 0 && (React.createElement(React.Fragment, null,
                props.getComments ? (React.createElement("button", { className: 'view', onClick: handleShowMore },
                    show ? 'Hide' : 'View',
                    " ",
                    props.totalReplyCount,
                    " ",
                    props.resource ? props.resource.replies : 'replies')) : React.createElement(React.Fragment, null),
                show ? (comments.map(function (c) { return (React.createElement(CommentItem, { key: c.id, commentId: c.id, authorProfileImageUrl: c.authorProfileImageUrl, authorDisplayName: c.authorDisplayName, likeCount: c.likeCount, textDisplay: c.textDisplay })); })) : (React.createElement(React.Fragment, null)))),
            nextPage && (React.createElement("button", { className: 'view', onClick: function () { return loadMore(props.commentId); } }, props.resource ? props.resource.view_more_replies : 'View more replies')))));
  /*
    React.useEffect(() => {
      console.log('comments', comments, show);
    }, [show]);
  */
 /*
  return (
    <div className='row comments'>
      <div className='col s12 m2 l2 xl1'>
        <div className='img-user'>
          <img src={props.authorProfileImageUrl} alt='Author Profile' />
        </div>
      </div>
      <div className='col s12 m10 l10 xl11'>
        <h3 className='author'>{props.authorDisplayName}</h3>
        <p dangerouslySetInnerHTML={{ __html: props.textDisplay }} />
        <h5>{props.resource ? props.resource.like : 'Like'}: {props.likeCount}</h5>
        {props.totalReplyCount && props.totalReplyCount > 0 && (
          <>
            {props.getComments ? (
              <button className='view' onClick={handleShowMore}>
                {show ? 'Hide' : 'View'} {props.totalReplyCount} {props.resource ? props.resource.replies : 'replies'}
              </button>
            ) : <></>}
            {show ? (
              comments.map((c) => (
                <CommentItem
                  key={c.id}
                  commentId={c.id}
                  authorProfileImageUrl={c.authorProfileImageUrl}
                  authorDisplayName={c.authorDisplayName}
                  likeCount={c.likeCount}
                  textDisplay={c.textDisplay}
                />
              ))
            ) : (
              <></>
            )}
          </>
        )}
        {nextPage && (
          <button className='view' onClick={() => loadMore(props.commentId)}>
            {props.resource ? props.resource.view_more_replies : 'View more replies'}
          </button>
        )}
      </div>
    </div>
  );*/
}