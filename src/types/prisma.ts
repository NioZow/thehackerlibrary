import { Prisma } from "@prisma/client";

export interface IGenericData {
  id: string;
  name: string;
}

export type Resource = Prisma.resourcesGetPayload<{
  include: {
    authors: true;
    tags: true;
    bookmarks: {
      select: { id: true };
    };
    readPosts: {
      select: { id: true };
    };
  };
}>;

export type ResourceRead = Prisma.resourcesGetPayload<{
  include: {
    authors: true;
    tags: true;
    bookmarks: {
      select: { id: true };
    };
    readPosts: {
      select: { id: true; readAt: true };
    };
  };
}>;

export type Path = Prisma.pathsGetPayload<{}>;

export type Author = Prisma.authorsGetPayload<{}>;

export type Tag = Prisma.tagsGetPayload<{}>;

export type Topic = Prisma.topicsGetPayload<{
  include: {
    tag: {
      include: {
        resources: {
          include: {
            authors: true;
            tags: true;
            bookmarks: true;
            readPosts: true;
          };
        };
      };
    };
    path: true;
    sections: {
      include: {
        tag: {
          include: {
            resources: {
              include: {
                authors: true;
                tags: true;
                bookmarks: true;
                readPosts: true;
              };
            };
          };
        };
      };
    };
  };
}>;
