import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TodosCursosPage } from '@/components/academia/todos-cursos/TodosCursosPage';

export default function TodosCursosRoute() {
  return (
    <DashboardLayout activeModule="academia" activeSubItem="todos-cursos" title="Academia">
      <TodosCursosPage />
    </DashboardLayout>
  );
}
