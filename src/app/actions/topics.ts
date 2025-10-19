"use server";

import prisma from "@/instances/prisma";
import { requireAdmin } from "@/lib/auth";

export async function deleteTopic(topicId: string) {
  try {
    await requireAdmin();
  } catch {
    return { success: false, message: "Unauthorized" };
  }

  try {
    await prisma.topics.delete({
      where: { id: topicId },
    });

    return { success: true, message: "Topic deleted successfully" };
  } catch (error) {
    return { success: false, message: "Error" };
  }
}

export interface ICreateTopicData {
  tag_id: string;
  path_id: string;
}

export async function createTopic(data: ICreateTopicData) {
  try {
    await requireAdmin();
  } catch {
    return { success: false, message: "Unauthorized" };
  }

  try {
    // Verify that the path exists
    const path = await prisma.paths.findUnique({
      where: { id: data.path_id },
    });

    if (!path) {
      return {
        success: false,
        message: "Path not found",
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

    const topic = await prisma.topics.create({
      data: {
        tag_id: data.tag_id,
        path_id: data.path_id,
      },
    });

    return {
      success: true,
      message: "Topic created successfully",
      // data: topic,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to create topic",
    };
  }
}
