"use server";

import prisma from "@/instances/prisma";
import { requireAdmin } from "@/lib/auth";

export async function deleteResource(resourceId: string) {
  try {
    await requireAdmin();
  } catch {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await prisma.resources.delete({
      where: { id: resourceId },
    });

    return { success: true, message: "Resource deleted successfully" };
  } catch (error) {
    return { success: false, message: "Error" };
  }
}

interface UpdateResourceParams {
  title: string;
  authors: string[];
  type: string;
  date: Date | null;
  tags: string[];
  time: number | null;
  url: string;
  accepted: boolean | null;
}

export async function updateResource(
  resourceId: string,
  data: UpdateResourceParams,
) {
  try {
    await requireAdmin();
  } catch {
    return { success: false, message: "Unauthorized" };
  }

  try {
    // validate resource exists
    const existingResource = await prisma.resources.findUnique({
      where: { id: resourceId },
    });

    if (!existingResource) {
      return {
        success: false,
        message: "Resource not found",
      };
    }

    // handle authors - create if they don't exist and link them
    const authorIds = await Promise.all(
      data.authors.map(async (authorName) => {
        let author = await prisma.authors.findUnique({
          where: { name: authorName },
        });

        if (!author) {
          author = await prisma.authors.create({
            data: { name: authorName },
          });
        }

        return author.id;
      }),
    );

    // handle tags - create if they don't exist and link them
    const tagIds = await Promise.all(
      data.tags.map(async (tagName) => {
        let tag = await prisma.tags.findUnique({
          where: { name: tagName },
        });

        if (!tag) {
          tag = await prisma.tags.create({
            data: { name: tagName },
          });
        }

        return tag.id;
      }),
    );

    // update the resource with new data
    const updatedResource = await prisma.resources.update({
      where: { id: resourceId },
      data: {
        title: data.title,
        url: data.url,
        type: data.type,
        date: data.date,
        time: data.time,
        accepted: data.accepted,
        authors: {
          set: [],
          connect: authorIds.map((id: string) => ({ id })),
        },
        tags: {
          set: [],
          connect: tagIds.map((id: string) => ({ id })),
        },
      },
      include: {
        authors: true,
        tags: true,
      },
    });

    return {
      success: true,
      message: "Resource updated successfully",
      resource: updatedResource,
    };
  } catch (error) {
    // handle unique constraint violation on URL
    if (
      error instanceof Error &&
      error.message.includes("Unique constraint failed")
    ) {
      return {
        success: false,
        message: "This URL is already in use by another resource",
      };
    }

    return {
      success: false,
      message: "Failed to update resource",
    };
  }
}

export async function createResource(data: UpdateResourceParams) {
  try {
    await requireAdmin();
  } catch {
    return { success: false, message: "Unauthorized" };
  }

  try {
    // handle authors - create if they don't exist
    const authorIds = await Promise.all(
      data.authors.map(async (authorName) => {
        let author = await prisma.authors.findUnique({
          where: { name: authorName },
        });

        if (!author) {
          author = await prisma.authors.create({
            data: { name: authorName },
          });
        }

        return author.id;
      }),
    );

    // Handle tags - create if they don't exist
    const tagIds = await Promise.all(
      data.tags.map(async (tagName) => {
        let tag = await prisma.tags.findUnique({
          where: { name: tagName },
        });

        if (!tag) {
          tag = await prisma.tags.create({
            data: { name: tagName },
          });
        }

        return tag.id;
      }),
    );

    // Create the new resource
    const newResource = await prisma.resources.create({
      data: {
        title: data.title,
        type: data.type,
        url: data.url,
        date: data.date,
        time: data.time,
        accepted: data.accepted,
        authors: {
          connect: authorIds.map((id: string) => ({ id })),
        },
        tags: {
          connect: tagIds.map((id: string) => ({ id })),
        },
      },
      include: {
        authors: true,
        tags: true,
      },
    });

    return {
      success: true,
      message: "Resource created successfully",
      resource: newResource,
    };
  } catch (error) {
    console.error("Error creating resource:", error);

    // Handle unique constraint violation on URL
    if (
      error instanceof Error &&
      error.message.includes("Unique constraint failed")
    ) {
      return {
        success: false,
        message: "This URL is already in use by another resource",
      };
    }

    return {
      success: false,
      message: "Failed to create resource",
    };
  }
}

export async function fetchAvailableAuthorsAndTags() {
  try {
    await requireAdmin();
  } catch {
    return { success: false, message: "Unauthorized" };
  }

  try {
    const authors = await prisma.authors.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    const tags = await prisma.tags.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });

    return {
      success: true,
      authors,
      tags,
    };
  } catch (error) {
    return {
      success: false,
      authors: [],
      tags: [],
    };
  }
}

export async function fetchAvailableTags() {
  try {
    const tags = await prisma.tags.findMany({
      select: { id: true, name: true },
      orderBy: { name: "asc" },
    });
    return {
      success: true,
      tags,
    };
  } catch (error) {
    console.error("Error fetching tags:", error);
    return {
      success: false,
      message: "Failed to fetch tags",
    };
  }
}
