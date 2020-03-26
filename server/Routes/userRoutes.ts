import { Router } from 'express';
import * as todoController from './todos';

const router = Router();

router.post('/todo', todoController.saveTodo);
router.get('/todo/:id', todoController.getOneTodo);
router.get('/todo', todoController.GetAllTodos);
router.delete('/todo/:id', todoController.deleteOneTodo);
router.patch('/todo/:id', todoController.updateOneTodo);

export default router;