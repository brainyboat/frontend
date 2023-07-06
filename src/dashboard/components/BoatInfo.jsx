import { Button, Container } from "react-bootstrap";

export default function BoatInfo() {
  return (
    <Container className="mt-3">
      <h3>Информацая о судне</h3>
      <ul>
        <li>
          <strong>Название:</strong> Тестовое судно
        </li>
        <li>
          <strong>Координаты:</strong> 43.401, 39.963
        </li>
        <li>
          <strong>Заряд аккумулятора:</strong> 79%
        </li>
      </ul>
      <h3>Команды</h3>
      <Button className="me-1">Построить маршрут</Button>
      <Button variant="secondary">Настройки</Button>
    </Container>
  );
}
