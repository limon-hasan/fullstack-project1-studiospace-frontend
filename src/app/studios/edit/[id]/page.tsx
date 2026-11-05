import { use } from "react";
import EditStudio from "@/components/shared/EditStudio";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditStudioPage({ params }: PageProps) {
  const { id } = use(params);

  return <EditStudio id={id} />;
}
