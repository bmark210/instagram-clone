import { useState } from 'react';
import { updateCommentsByPostId } from '../../utils/firebase';
import useUserStore from '../../store/userStore';

function AddComment({ docId, comments, setComments, commentInput }) {
  const user = useUserStore((state) => state.user);

  const [comment, setComment] = useState('');

  const handleSubmitComment = async (event) => {
    event.preventDefault();

    setComments([...comments, { username: user.username, comment }]);
    setComment('');
    const username = user.username;
    await updateCommentsByPostId(docId, username, comment);
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(event) =>
          comment.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault()
        }
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray-base w-full mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && 'opacity-25'
          }`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}
export default AddComment;
