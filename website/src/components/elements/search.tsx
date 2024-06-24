import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { ActionIcon, rem, TextInput } from '@mantine/core';
import { IconArrowRight, IconSearch } from '@tabler/icons-react';

import classes from '@/style/search.module.css';

import { newParams } from '@/util/params';

import { SearchParams } from '@/constant/types';


interface IProps {
  searchParams: SearchParams;
}

const SearchInput = ({ searchParams }: IProps) => {
  const [filter, setFilter] = useState('');
  const router = useRouter();

  useEffect(() => {
    setFilter(searchParams.where ? searchParams.where : '');
  }, [searchParams]);

  return (
    <TextInput
      size="md"
      classNames={{
        input: classes.input,
      }}
      placeholder="Search resources..."
      rightSectionWidth={42}
      leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
      rightSection={
        <ActionIcon
          size={32}
          radius="xl"
          color="indigo"
          variant="filled"
          onClick={() => {
            searchParams.where = filter;
            const sp = newParams(searchParams, true);
            router.push(`/?${sp.toString()}`);
          }}
        >
          <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        </ActionIcon>
      }
      onChange={(event) => setFilter(event.target.value)}
    />
  );
};

export default SearchInput;
