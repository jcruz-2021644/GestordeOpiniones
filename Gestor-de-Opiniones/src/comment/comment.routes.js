import { Router } from "express";
import {createComment, updateComment, deleteComment, getComments, getCommentById } from "./comment.controller.js";
import { validateCreateComment, validateUpdateComment, validateCommentById, validateGetComments } from "../../middlewares/comment-validators.js";

const router = Router();

// crear comentario para una publicación (postId en params)
router.post(
    '/:postId/create',
    validateCreateComment,
    createComment
);

// listar comentarios de una publicación: /post/:postId
router.get(
    '/post/:postId',
    validateGetComments,
    getComments
);

router.get(
    '/:id',
    validateCommentById,
    getCommentById
);

router.put(
    '/:id',
    validateUpdateComment,
    updateComment
);

router.delete(
    '/:id',
    validateCommentById,
    deleteComment
);

export default router;
