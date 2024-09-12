import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Comments() {
  const { videoId } = useParams();

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");
  const [loginUser,setLoginUser] = useState("");

  const getCommentUrl = `http://localhost:3000/api/v1/comments/${videoId}`;

  useEffect(() => {
    const getVideoComments = async () => {
      try {
        const response = await axios.get(getCommentUrl, {
          withCredentials: true,
        });
        console.log("video Comments: ", response.data.data.allComments);
        setComments(response.data.data.allComments || []); // Handle undefined response
      } catch (error) {
        console.log("Error in fetching video comments: " + error.message);
        setLoginUser(error.message);
      }
    };

    getVideoComments();
  }, [getCommentUrl]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    console.log("New Comment inside: ", newComment);

    const CreateCommentUrl = `http://localhost:3000/api/v1/comments/${videoId}`;

    try {
      const response = await axios.post(CreateCommentUrl, { content: newComment }, { withCredentials: true });
      console.log("Comment data: ", response.data);

      // Update the comments list with the new comment
      setComments((prevComments) => [...prevComments, response.data.data]);
      setNewComment('');
    } catch (error) {
      console.log("Error in comment request: ", error.message);
    }
  };

  const deleteComment = async (commentId) => {
    const deleteCommentURL = `http://localhost:3000/api/v1/comments/c/${commentId}`;
    try {
      const responseDeleteComment = await axios.delete(deleteCommentURL, {
        withCredentials: true,
      });
      console.log("delete comment", responseDeleteComment);
      // Update the comments list after deletion
      setComments((prevComments) => prevComments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.log("error deleting comment", error.message);
    }
  };

  const editComment = async (commentId) => {
    const editCommentURL = `http://localhost:3000/api/v1/comments/c/${commentId}`;
    try {
      const responseEditComment = await axios.patch(editCommentURL, { content: editingContent }, { withCredentials: true });
      console.log("edit comment", responseEditComment);
      // Update the comments list after editing
      setComments((prevComments) => 
        prevComments.map(comment => 
          comment._id === commentId ? { ...comment, content: responseEditComment.data.data.content } : comment
        )
      );
      setEditingCommentId(null);
      setEditingContent("");
    } catch (error) {
      console.log("error editing comment", error.message);
    }
  };

  return (
    <div className="w-[66vw] mx-auto rounded-xl shadow-xl border-2 h-full bg-black opacity-90 p-4">
      <h2 className="text-2xl mb-4 text-white font-semibold font-sans text-center">
        Comments
      </h2>
      <form onSubmit={handleCommentSubmit} className="mb-4">
        <textarea
          className="w-full p-2 mb-2 border rounded"
          rows="2"
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          placeholder="Add a comment..."
        ></textarea>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Comment
        </button>
      </form>
      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="flex flex-row justify-between p-1">
              {editingCommentId === comment._id ? (
                <div className="flex flex-row justify-between p-1">
                  <textarea
                    className="w-full p-2 mb-2 border rounded"
                    rows="2"
                    value={editingContent}
                    onChange={(event) => setEditingContent(event.target.value)}
                  ></textarea>
                  <button
                    onClick={() => editComment(comment._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingCommentId(null)}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <div className="p-2 mb-2 bg-white border rounded">
                    {comment.content}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        setEditingCommentId(comment._id);
                        setEditingContent(comment.content);
                      }}
                      className="px-2 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteComment(comment._id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="text-white">{loginUser  === "Request failed with status code 401" ?"Login to add and see comments": "No comments yet."}</div>
        )}
      </div>
    </div>
  );
}

export default Comments;
