import { useZustandCreate } from '../../utils/useZustandCreate'

export const useTodoStore = () => {
	const todosStore = useZustandCreate('todoStore', (set, get) => {
		return {
			todos: [],
			addTodo: (todo) => {
				set((state) => {
					return { todos: [...state.todos, todo] }
				})
			},
			removeTodo: (id) => {
				set((state) => {
					return {
						todos: state.todos.filter((todo) => {
							return todo.id !== id
						}),
					}
				})
			},
			updateTodo: (updatedTodo) => {
				set((state) => {
					return {
						todos: state.todos.map((todo) => {
							return todo.id === updatedTodo.id ? updatedTodo : todo
						}),
					}
				})
			},
		}
	})
	return { todosStore }
}
