import { Router } from "express";
import {createComment, updateComment, deleteComment, getComments, getCommentById } from "./comment.controller.js";
import { validateCreateComment, validateUpdateComment, validateCommentById, validateGetComments } from "../../middlewares/comment-validators.js";

const router = Router();

router.post(
    '/create',
    validateCreateComment,
    createComment
);

router.get(
    '/',
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
