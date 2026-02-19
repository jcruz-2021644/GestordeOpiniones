import { Router } from "express";
import {createComment, updateComment, deleteComment, getComments, getCommentById, getAllComments } from "./comment.controller.js";
import {validateCreateComment, validateUpdateComment, validateCommentById, validateGetComments } from "../../middlewares/comment-validators.js";
import { requireRole } from "../../middlewares/validate-role.js";
import { validateJWT } from "../../middlewares/validate-JWT.js";

const router = Router();

// crear comentario para una publicación
router.post(
    '/post/:postId',
    validateCreateComment,
    createComment
);

// ver los comentarios de un post
router.get(
    '/post/:postId',
    validateGetComments,
    getComments
);

// obtener coemntario por id

router.get(
    '/',
    validateJWT,
    requireRole('ADMIN_ROLE'),
    getAllComments
);

// buscar por id
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
