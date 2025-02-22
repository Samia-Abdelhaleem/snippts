import SnippetEditForm from "@/components/snippet-edit-form";
import db from "@/db";
import { notFound } from "next/navigation";

interface SnippetEditPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetEditPage(props: SnippetEditPageProps) {
  // id from parent 
  const id = +props.params.id;
  const snippet = await db.snippet.findFirst({where:{id}})
  if(!snippet){
    return notFound()
  }

  return (
    <>
      <SnippetEditForm snippet={snippet}/>
    </>
  );
}
