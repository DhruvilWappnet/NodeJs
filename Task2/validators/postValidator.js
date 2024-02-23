const validateId = (id) => {
    if (!Number.isInteger(id) || id > 1000) return false;
    return true;
}

const validateTitle = (title) => {
    if (typeof title !== "string" || title.trim() === '') return false;
    return true;
}

const validatePost = (post) => {
    if(!validateId(post.postId) || !validateId(post.userId)){
        throw new Error("Invalid Id");
    }
    if(!validateTitle(post.title)){
        throw new Error("Invalid Title.");
    }
}

module.exports=validatePost;