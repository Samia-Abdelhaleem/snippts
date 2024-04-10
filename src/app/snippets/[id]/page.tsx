import db from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as actions from "@/actions";
export interface SnippetShowPageProps {
  params: { id: string };
}

export async function generateStaticParams() {
  const snippets = await db.snippet.findMany()
  return snippets.map((snippet)=>{
    return {id : snippet.id.toString()}
  })
  
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  // to generate delay
  await new Promise((r) => setTimeout(r, 3000));

  const id = +props.params.id;
  const snippet = await db.snippet.findFirst({ where: { id } });

  if (!snippet) {
    // return notFound();
    return <div> snippet Not found </div>;
  }

  const deleteSnippetAction = actions.deleteSnippetAction.bind(null, id);

  return (
    <>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold"> {snippet.title}</h1>
        <div className="flex gap-2">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit{" "}
          </Link>
          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded">Delete </button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </>
  );
}
