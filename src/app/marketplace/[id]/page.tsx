import ProjectDetailPage from '@/components/marketplace/project/ProjectDetailPage';
import MainLayout from '@/app/layouts/MainLayout';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <MainLayout>
      <ProjectDetailPage projectId={params.id} />
    </MainLayout>
  );
}
