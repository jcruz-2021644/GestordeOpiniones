'use strict';

import Post from './post.model.js';

// ==========================================
// CREAR PUBLICACIÓN
// ==========================================
export const createPost = async (req, res) => {
    try {
        const { title, category, content } = req.body;

        const userId = req.user.sub;        // 🔥 viene del JWT
        const username = req.user.username; // 🔥 viene del JWT

        if (!title || !category || !content) {
            return res.status(400).json({
                success: false,
                message: 'Todos los campos son obligatorios'
            });
        }

        const post = new Post({
            title,
            category,
            content,
            userId,
            username
        });

        await post.save();

        res.status(201).json({
            success: true,
            message: 'Publicación creada exitosamente',
            data: post
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al crear publicación',
            error: error.message,
            details: req.user ? req.user : null
        });
    }
};


// ==========================================
// OBTENER TODAS LAS PUBLICACIONES ACTIVAS
// ==========================================
export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({ status: 'activa' })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: posts
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener publicaciones',
            error: error.message
        });
    }
};


// ==========================================
// OBTENER PUBLICACIÓN POR ID
// ==========================================
export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada'
            });
        }

        res.status(200).json({
            success: true,
            data: post
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al buscar publicación',
            error: error.message
        });
    }
};


// ==========================================
// ACTUALIZAR PUBLICACIÓN
// ==========================================
export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, category, content } = req.body;

        const userId = req.user.sub;  // 🔥 corregido
        const role = req.user.role;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada'
            });
        }

        // 🔐 Permisos
        if (post.userId !== userId && role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                success: false,
                message: 'No autorizado para editar esta publicación'
            });
        }

        post.title = title || post.title;
        post.category = category || post.category;
        post.content = content || post.content;

        await post.save();

        res.status(200).json({
            success: true,
            message: 'Publicación actualizada correctamente',
            data: post
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al actualizar publicación',
            error: error.message
        });
    }
};


// ==========================================
// ELIMINAR PUBLICACIÓN
// ==========================================
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const userId = req.user.sub;  // 🔥 corregido
        const role = req.user.role;

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Publicación no encontrada'
            });
        }

        // 🔐 Permisos
        if (post.userId !== userId && role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                success: false,
                message: 'No autorizado para eliminar esta publicación'
            });
        }

        await Post.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Publicación eliminada correctamente'
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error al eliminar publicación',
            error: error.message
        });
    }
};
