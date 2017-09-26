import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  Text,
} from '@bufferapp/components';
import TextPost from '../TextPost';
import ImagePost from '../ImagePost';
import MultipleImagesPost from '../MultipleImagesPost';
import LinkPost from '../LinkPost';
import VideoPost from '../VideoPost';
import PostDragWrapper from '../PostDragWrapper';

const postStyle = {
  marginBottom: '2rem',
};

const listHeaderStyle = {
  marginBottom: '1rem',
  marginTop: '1rem',
  marginLeft: '0.5rem',
};

const postTypeComponentMap = new Map([
  ['text', TextPost],
  ['image', ImagePost],
  ['multipleImage', MultipleImagesPost],
  ['link', LinkPost],
  ['video', VideoPost],
]);

/* eslint-disable react/prop-types */

const renderPost = ({
  post,
  onCancelConfirmClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  draggable,
}) => {
  const postWithEventHandlers = {
    ...post,
    key: post.id,
    onCancelConfirmClick: () => onCancelConfirmClick({ post }),
    onDeleteClick: () => onDeleteClick({ post }),
    onDeleteConfirmClick: () => onDeleteConfirmClick({ post }),
    onEditClick: () => onEditClick({ post }),
    onShareNowClick: () => onShareNowClick({ post }),
    onImageClick: () => onImageClick({ post }),
    onImageClickNext: () => onImageClickNext({ post }),
    onImageClickPrev: () => onImageClickPrev({ post }),
    onImageClose: () => onImageClose({ post }),
  };
  let PostComponent = postTypeComponentMap.get(post.type);
  PostComponent = PostComponent || TextPost;

  if (draggable) {
    return (
      <PostDragWrapper id={post.id}>
        <PostComponent {...postWithEventHandlers} />
      </PostDragWrapper>
    );
  }

  return <PostComponent {...postWithEventHandlers} />;
};

/* eslint-enable react/prop-types */

const PostList = ({
  listHeader,
  posts,
  onCancelConfirmClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  draggable,
}) =>
  <div>
    <div style={listHeaderStyle}>
      <Text
        color={'black'}
      >
        {listHeader}
      </Text>
    </div>
    <List
      items={posts.map(post =>
        <div style={postStyle}>
          {
            renderPost({
              post,
              onCancelConfirmClick,
              onDeleteClick,
              onDeleteConfirmClick,
              onEditClick,
              onShareNowClick,
              onImageClick,
              onImageClickNext,
              onImageClickPrev,
              onImageClose,
              draggable,
            })
          }
        </div>,
      )}
    />
  </div>;

PostList.propTypes = {
  listHeader: PropTypes.string,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
    }),
  ),
  onCancelConfirmClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onDeleteConfirmClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onShareNowClick: PropTypes.func,
  onImageClick: PropTypes.func,
  onImageClickNext: PropTypes.func,
  onImageClickPrev: PropTypes.func,
  onImageClose: PropTypes.func,
  draggable: PropTypes.bool,
};

PostList.defaultProps = {
  posts: [],
  draggable: false,
};

export default PostList;
