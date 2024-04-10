"use client";

import { Snippet } from "@prisma/client";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import * as actions from "@/actions"
// import { editSnippetAction } from "@/actions";
interface SnippetEditFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
    const [code, setCode] = useState(snippet.code)
  function handleEditorChange(value : string='' ) {
    setCode(value)
    
  }

const editSnippetAction = actions.editSnippetAction.bind(null,{id : snippet.id , code  })

  return (
    <>
      <Editor
        height="40vh"
        theme="vs-dark"
        defaultLanguage="javascript"
        defaultValue={code}
        onChange={handleEditorChange}
        options={{ minimap:{
            enabled : false
        } }}
      />

      <form action={editSnippetAction}>
        <button type="submit" className="p-2 my-4 border rounded" >Save</button>
      </form>
    </>
  );
}
