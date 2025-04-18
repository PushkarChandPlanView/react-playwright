import { test, expect } from '@playwright/test';

test.describe('TodoList Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/'); // adjust based on your dev server port/path
  });

  test('should render the todo list UI', async ({ page }) => {
    await expect(page.getByPlaceholder('Add a new task...')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add' })).toBeVisible();
    await expect(page.getByText('Todo List')).toBeVisible();
  });

  test('should add a new todo item', async ({ page }) => {
    const todoText = 'Buy groceries';

    await page.getByPlaceholder('Add a new task...').fill(todoText);
    await page.getByRole('button', { name: 'Add' }).click();

    await expect(page.getByText(todoText)).toBeVisible();
  });

  test('should add todo by pressing Enter', async ({ page }) => {
    const todoText = 'Walk the dog';

    const input = page.getByPlaceholder('Add a new task...');
    await input.fill(todoText);
    await input.press('Enter');

    await expect(page.getByText(todoText)).toBeVisible();
  });

  test('should not add a todo if input is empty or only spaces', async ({ page }) => {
    const input = page.getByPlaceholder('Add a new task...');
    await input.fill('   ');
    await page.getByRole('button', { name: 'Add' }).click();

    const todos = await page.locator('li').all();
    expect(todos.length).toBe(0);
  });

  test('should toggle todo completed status', async ({ page }) => {
    const todoText = 'Learn Playwright';

    await page.getByPlaceholder('Add a new task...').fill(todoText);
    await page.getByRole('button', { name: 'Add' }).click();

    const checkbox = page.locator('input[type="checkbox"]');
    await checkbox.check();

    const todoItem = page.locator('li');
    await expect(todoItem).toHaveCSS('text-decoration', /line-through/);
    await expect(todoItem).toHaveCSS('opacity', '0.7');

    await checkbox.uncheck();
    await expect(todoItem).not.toHaveCSS('text-decoration', /line-through/);
  });

  test('should delete a todo item', async ({ page }) => {
    const todoText = 'Clean the house';

    await page.getByPlaceholder('Add a new task...').fill(todoText);
    await page.getByRole('button', { name: 'Add' }).click();

    const deleteButton = page.getByRole('button', { name: '×' });
    await deleteButton.click();

    await expect(page.getByText(todoText)).toHaveCount(0);
  });
});
