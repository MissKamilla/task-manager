import { users } from '@/data/mockData';
import UsersPanel from '@/components/UsersPanel';

//render - отрендерить компонент
//screen - искать элемент в отрисованном DOM
import { render, screen, fireEvent } from '@testing-library/react';
//descripe  - групирует тесты компонента
//it        - один текстовый сценарий
//expect    -  проверка результата
import { describe, it, expect } from 'vitest';

//describe - группа тестов
describe('UsersPanel', () => {
  // it/test - один сценарий
  it('render search field and user list', () => {
    //render - рендерит компонент в тестовую DOM-среду
    render(<UsersPanel />);

    //expect - проверка
    //screen - основной способ искать элементы
    expect(screen.getByLabelText('Search')).toBeInTheDocument();
    expect(screen.getByText(users[0].name)).toBeInTheDocument();
  });

  it('filters users by search query', () => {
    render(<UsersPanel />);

    const input = screen.getByLabelText('Search');
    const firstUser = users[0];
    const secondUser = users[1];

    fireEvent.change(input, { target: { value: firstUser.email } });

    expect(input).toHaveValue(firstUser.email);
    expect(screen.getByText(firstUser.email)).toBeInTheDocument();
    expect(screen.queryByText(secondUser.email)).not.toBeInTheDocument();
  });
});
