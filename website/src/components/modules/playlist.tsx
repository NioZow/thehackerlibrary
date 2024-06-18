'use client';

import { Resource } from '@/src/constants/types';
import { Capitalize } from '@/src/utils/array';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { rem, Text } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import { IconGripVertical } from '@tabler/icons-react';
import cx from 'clsx';

import classes from '@/style/playlist.module.css';

import { ActiveDirectoryIcon } from '@/icon/icons';

interface IProps {
  resources: Resource[];
}

export const PlaylistContent = ({ resources }: IProps) => {
  const [state, handlers] = useListState(resources);

  const items = state.map((item, index) => (
    <Draggable key={item.url} index={index} draggableId={item.url ? item.url : ''}>
      {(provided, snapshot) => (
        <div
          className={cx(classes.item, classes.draggableitem, { [classes.itemDragging]: snapshot.isDragging })}
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div {...provided.dragHandleProps} className={classes.dragHandle}>
            <IconGripVertical style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </div>
          <div>
            <Text>{item.name}</Text>
            <Text c="dimmed" size="sm">
              Authors: {item.authors?.map((tag) => tag.name).join(' • ')} • Difficulty:{' '}
              {Capitalize(item.difficulty ? item.difficulty : '')}
            </Text>
          </div>

          <ActiveDirectoryIcon />
        </div>
      )}
    </Draggable>
  ));

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => handlers.reorder({ from: source.index, to: destination?.index || 0 })}
    >
      <Droppable droppableId="dnd-list" direction="vertical">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {items}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
