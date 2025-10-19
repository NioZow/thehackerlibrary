"use server";

import prisma from "@/instances/prisma";
import { requireAdmin } from "@/lib/auth";

export async function deleteSection(sectionId: string) {
  try {
    await requireAdmin();
  } catch {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await prisma.sections.delete({
      where: { id: sectionId },
    });

    return { success: true, message: "Section deleted successfully" };
  } catch (error) {
    return { success: false, message: "Error" };
  }
}

interface ICreateSectionData {
  tag_id: string;
  priority: number;
  topic_id: string;
}

export async function createSection(data: ICreateSectionData) {
  try {
    await requireAdmin();
  } catch {
    return { success: false, message: "Unauthorized" };
  }

  try {
    // Verify that the topic exists
    const topic = await prisma.topics.findUnique({
      where: { id: data.topic_id },
    });

    if (!topic) {
      return {
        success: false,
        message: "Topic not found",
      };
    }

    // Verify that the tag exists
    const tag = await prisma.tags.findUnique({
      where: { id: data.tag_id },
    });

    if (!tag) {
      return {
        success: false,
        message: "Tag not found",
      };
    }

    const section = await prisma.sections.create({
      data: {
        tag_id: data.tag_id,
        priority: data.priority,
        topic_id: data.topic_id,
      },
    });

    return {
      success: true,
      message: "Section created successfully",
      data: section,
    };
  } catch (error) {
    console.error("Error creating section:", error);
    return {
      success: false,
      message: "Failed to create section",
    };
  }
}
