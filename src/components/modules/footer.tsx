'use client';

import { ActionIcon, Anchor, Group, rem } from '@mantine/core';
import { IconBrandGithub, IconBrandX } from '@tabler/icons-react';

import classes from '@/style/footer.module.css';

import { cn } from '@/util/style.util';


const links = [{ link: 'https://github.com/NioZow/thehackerlibrary', label: 'Contribute on github' }];

const Footer = () => {
  const items = links.map((link) => (
    <Anchor c="dimmed" key={link.label} href={link.link} lh={1} onClick={(event) => event.preventDefault()} size="sm">
      {link.label}
    </Anchor>
  ));

  return (
    <div className={cn(classes.footer, 'ml-24 mr-24')}>
      <div className={classes.inner}>
        <p></p>

        <Group className={classes.links}>{items}</Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <a href="https://x.com/NioZow" target="_blank">
            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandX style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          </a>
          <a href="https://github.com/NioZow" target="_blank">
            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
            </ActionIcon>
          </a>
        </Group>
      </div>
    </div>
  );
};

export default Footer;
