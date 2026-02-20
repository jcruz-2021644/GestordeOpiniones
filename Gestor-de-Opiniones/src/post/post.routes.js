import { Router } from "express";
import {createPost, getPosts, updatePost, deletePost, getPostById, getPostWithComments } from "./post.controller.js";
import { validateCreatePost, validateUpdatePost, validatePostById } from "../../middlewares/post-validators.js";
import { upload, handleUploadError } from "../../helpers/file-upload.js";

const router = Router();

// crear
router.post(
    '/create',
    upload.single('image'),
    validateCreatePost,
    createPost,
    handleUploadError
);

//listar
router.get(
    '/',
    getPosts
);

//actualizar
router.put(
    '/:id',
    upload.single('image'),
    validateUpdatePost,
    updatePost,
    handleUploadError
);

//eliminar
router.delete(
    '/:id',
    validatePostById,
    deletePost
);

//buscar
router.get(
    '/:id',
    validatePostById,
    getPostById 
);

//listar la publi con sus coments
router.get(
    '/:id/comments',
    validatePostById,
    getPostWithComments
);
export default router;
