"use server";

import { auth } from "@/auth";
import prisma from "@/instances/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ResourceSchema = z.object({
  resourceId: z.string().uuid("v4"),
});

type ActionResult = {
  success: boolean;
  error?: string;
};

export async function toggleBookmark(
  resourceId: string,
): Promise<ActionResult> {
  try {
    const validated = ResourceSchema.parse({ resourceId });
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "Please sign in to bookmark resources" };
    }

    const existing = await prisma.bookmark.findUnique({
      where: {
        userId_resourceId: {
          userId: session.user.id,
          resourceId: validated.resourceId,
        },
      },
    });

    if (existing) {
      await prisma.bookmark.delete({
        where: {
          userId_resourceId: {
            userId: session.user.id,
            resourceId: validated.resourceId,
          },
        },
      });
    } else {
      await prisma.bookmark.create({
        data: {
          userId: session.user.id,
          resourceId: validated.resourceId,
        },
      });
    }

    revalidatePath("/profile/bookmarks");
    revalidatePath("/search");
    return { success: true };
  } catch (error) {
    console.error("Error toggling bookmark:", error);
    return { success: false, error: "Failed to update bookmark" };
  }
}

export async function toggleReadPost(
  resourceId: string,
): Promise<ActionResult> {
  try {
    const validated = ResourceSchema.parse({ resourceId });
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: "Please sign in to track read posts" };
    }

    const existing = await prisma.readPost.findUnique({
      where: {
        userId_resourceId: {
          userId: session.user.id,
          resourceId: validated.resourceId,
        },
      },
    });

    if (existing) {
      await prisma.readPost.delete({
        where: {
          userId_resourceId: {
            userId: session.user.id,
            resourceId: validated.resourceId,
          },
        },
      });
    } else {
      await prisma.readPost.create({
        data: {
          userId: session.user.id,
          resourceId: validated.resourceId,
        },
      });
    }

    revalidatePath("/profile/read");
    revalidatePath("/search");
    return { success: true };
  } catch (error) {
    console.error("Error toggling read post:", error);
    return { success: false, error: "Failed to update read status" };
  }
}
