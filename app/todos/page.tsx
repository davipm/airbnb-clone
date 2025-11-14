'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Loader2, Trash2 } from 'lucide-react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Field, FieldError, FieldGroup } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { orpc } from '@/utils/orpc';

const todoSchema = z.object({
  text: z.string().min(1, 'Please add some text').trim(),
});

export default function Page() {
  const { data: todos = [], refetch, isLoading } = useQuery(orpc.todos.getAll.queryOptions());

  const form = useForm<z.infer<typeof todoSchema>>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      text: '',
    },
  });

  const createMutation = useMutation(
    orpc.todos.create.mutationOptions({
      onSuccess: async () => {
        await refetch();
        form.reset();
      },
    }),
  );

  const toggleMutation = useMutation(
    orpc.todos.toggle.mutationOptions({
      onSuccess: async () => {
        await refetch();
      },
    }),
  );

  const deleteMutation = useMutation(
    orpc.todos.delete.mutationOptions({
      onSuccess: async () => {
        await refetch();
      },
    }),
  );

  const handleToggleTodo = (id: number, completed: boolean) => {
    toggleMutation.mutate({ id, completed: !completed });
  };

  const handleDeleteTodo = (id: number) => {
    deleteMutation.mutate({ id });
  };

  const onSubmit: SubmitHandler<z.infer<typeof todoSchema>> = (data) => {
    createMutation.mutate(data);
  };

  return (
    <div className="mx-auto w-full max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>Items List</CardTitle>
          <CardDescription>Manage your tasks efficiently</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="mb-6 flex items-start space-x-2" onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="text"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <Input
                      {...field}
                      id={field.name}
                      disabled={createMutation.isPending}
                      placeholder="Add a new task..."
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
            </FieldGroup>

            <Button disabled={createMutation.isPending} type="submit">
              {createMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Add'}
            </Button>
          </form>

          {isLoading && (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}

          {todos.length === 0 && !isLoading && (
            <p className="py-4 text-center">No todos yet. Add one above!</p>
          )}

          <ul className="space-y-2">
            {todos.map((todo) => (
              <li className="flex items-center justify-between rounded-md border p-2" key={todo.id}>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={todo.completed}
                    id={`todo-${todo.id}`}
                    onCheckedChange={() => handleToggleTodo(todo.id, todo.completed)}
                  />
                  <label
                    className={`${todo.completed ? 'text-muted-foreground line-through' : ''}`}
                    htmlFor={`todo-${todo.id}`}
                  >
                    {todo.text}
                  </label>
                </div>
                <Button
                  aria-label="Delete todo"
                  onClick={() => handleDeleteTodo(todo.id)}
                  size="icon"
                  variant="ghost"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
