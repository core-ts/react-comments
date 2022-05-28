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
  format?: (f: string, ...args: any[]) => string;
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
  return (!props.commentId || props.commentId.length === 0 ? null :
    React.createElement('div', { className: 'row comments' },
        React.createElement('div', { className: 'col s12 m2 l2 xl1' },
            React.createElement('div', { className: 'img-user' },
                React.createElement('img', { src: props.authorProfileImageUrl, alt: 'Author Profile' }))),
        React.createElement('div', { className: 'col s12 m10 l10 xl11' },
            React.createElement('h3', { className: 'author' }, props.authorDisplayName),
            React.createElement('p', { dangerouslySetInnerHTML: { __html: props.textDisplay } }),
            !props.likeCount || props.likeCount <= 0 ? null : React.createElement('h5', null,
                props.resource ? props.resource.like : 'Like',
                ': ',
                props.likeCount),
            !props.getComments || !props.totalReplyCount || props.totalReplyCount === 0 ? null :
                React.createElement('button', { className: 'view', onClick: handleShowMore }, show ? props.format && props.resource ? props.format(props.resource.hide_replies, props.totalReplyCount) : 'Hide ' + props.totalReplyCount + ' replies' : props.format && props.resource ? props.format(props.resource.view_replies, props.totalReplyCount) : 'View ' + props.totalReplyCount + ' replies'),
            // tslint:disable-next-line:only-arrow-functions
            !props.getComments || !show ? null : comments.map(function (c: any) { return (React.createElement(CommentItem, { key: c.id, commentId: c.id, authorProfileImageUrl: c.authorProfileImageUrl, authorDisplayName: c.authorDisplayName, likeCount: c.likeCount, textDisplay: c.textDisplay })); }),
            show && nextPage &&
                // tslint:disable:only-arrow-functions
                // tslint:disable-next-line:object-literal-shorthand
                React.createElement('button', { className: 'view', onClick: function () { return loadMore(props.commentId); } }, props.resource ? props.resource.view_more_replies : 'View more replies'))));
  /*
  return (
    !props.commentId || props.commentId.length === 0 ? null :
    <div className='row comments'>
      <div className='col s12 m2 l2 xl1'>
        <div className='img-user'>
          <img src={props.authorProfileImageUrl} alt='Author Profile' />
        </div>
      </div>
      <div className='col s12 m10 l10 xl11'>
        <h3 className='author'>{props.authorDisplayName}</h3>
        <p dangerouslySetInnerHTML={{ __html: props.textDisplay }} />
        {!props.likeCount || props.likeCount <= 0 ? null : <h5>{props.resource ? props.resource.like : 'Like'}: {props.likeCount}</h5>}
        {!props.getComments || !props.totalReplyCount || props.totalReplyCount === 0 ? null :
          <button className='view' onClick={handleShowMore}>
            {show ? props.format && props.resource ? props.format(props.resource.hide_replies, props.totalReplyCount) : `Hide ${props.totalReplyCount} replies` : props.format && props.resource ? props.format(props.resource.view_replies, props.totalReplyCount) : `View ${props.totalReplyCount} replies`}
          </button>
        }
        {!props.getComments || !show ? null : comments.map((c) => (
          <CommentItem
            key={c.id}
            commentId={c.id}
            authorProfileImageUrl={c.authorProfileImageUrl}
            authorDisplayName={c.authorDisplayName}
            likeCount={c.likeCount}
            textDisplay={c.textDisplay}
          />
        ))}
        {show && nextPage &&
          <button className='view' onClick={() => loadMore(props.commentId)}>
            {props.resource ? props.resource.view_more_replies : 'View more replies'}
          </button>
        }
      </div>
    </div>
  );*/
}
