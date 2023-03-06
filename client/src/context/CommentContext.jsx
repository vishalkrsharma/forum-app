import React, { useContext, useEffect, useMemo, useState } from "react";
import usePost from "../hooks/usePost";
import { useParams } from "react-router-dom";

const Context = React.createContext();

export function useCommentContext(){
  return useContext(Context)
}

export function CommentProvider({ children }) {
  const { getComments } = usePost();
  const [comments, setComments] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getComments(id).then((res) => {
        setComments(res);
      });
    }
  }, [id]);
  const commentsByParentId = useMemo(()=>{
    const group = {}
    comments.forEach(comment=>{
      group[comment.parentId] ||= []
      group[comment.parentId].push(comment)
    })
    return group
  },[comments])

  function getReplies(parentId) {
    return commentsByParentId[parentId]
  }

  return <Context.Provider value={{
    comments,
    setComments,
     post : {id, ...comments} ,
     getReplies,
     rootComments : commentsByParentId[null]
    }}>{children}</Context.Provider>;
}
