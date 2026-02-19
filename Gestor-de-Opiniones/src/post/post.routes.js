import { Router } from "express";
import {createPost, getPosts, updatePost, deletePost, getPostById } from "./post.controller.js";
import { validateCreatePost, validateUpdatePost, validatePostById } from "../../middlewares/post-validators.js";

const router = Router();

// crear
router.post(
    '/create',
    validateCreatePost,
    createPost
);

//listar
router.get(
    '/',
    getPosts
);

//actualizar
router.put(
    '/:id',
    validateUpdatePost,
    updatePost
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
export default router;
