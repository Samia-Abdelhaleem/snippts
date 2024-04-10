"use server";

import db from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface editSnippetActionProps {
  id: number;
  code: string;
}
export async function editSnippetAction(
  { id, code }: editSnippetActionProps,
  formData: FormData
) {
  await db.snippet.update({ where: { id }, data: { code } });
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
}

export async function deleteSnippetAction(id: number) {
  await db.snippet.delete({ where: { id } });
  revalidatePath("/");
  redirect(`/`);
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    const title = formData.get("title");
    const code = formData.get("code");

    if (typeof title !== "string" || title.length < 3) {
      return { message: "Title must be longer" };
    }

    if (typeof code !== "string" || code.length < 10) {
      return { message: "Code must be longer" };
    }

    await db.snippet.create({
      data: {
        title,
        code,
      },
    });

    // throw new Error("error while saving");
  } catch (error) {
    if (error instanceof Error) {
      return { message: error.message };
    } else {
      return {
        message: "Something went wrong ............",
      };
    }
  }
  revalidatePath("/");
  redirect("/");
}
