# The Hacker Library Query Language (THLQL)

**THLQL** is a simple query language used to make advanced search queries to filter your searches.

> [!TIP]
> Example:
>
> `date.lt:2024 and tag.eq:Rootkit` will return all post about rootkits released before 2024.

## Fields

- `id`: the unique numeric identifier of a resource.
- `date`: the day a resource was released.
- `time`: the time **it is supposed** to take to go through a resource.
- `author`: an author of a resource.
- `tag`: a tag of a resource.
- `type`: the type of resource (i.e. `video` or `post`).
- `title`: the name of the resource.
- `lang`: the language of a resource (for now only `en` and `fr` are used).

> [!INFO]
> In order to be consistent with authors name, I've chosen to always call an author after its nickname instead of its real name.
> If I don't know the nickname of an author then its real name is used, if you know the nickname of an author who is called by its real name on the site,
> please submit a [Pull Request](https://github.com/niozow/thehackerlibrary/pulls).
>
> This might be subject to changes in the future as I'm not absolutely sure this was the best thing to do.

## Operators

### Integers & Dates

These operators work on **fields** that are numerical or dates such as `id`, `date` and `time` :

- `eq`: equal to the supplied value.
- `ne`: **not** equal to the supplied value.
- `gt`: greater than the supplied value.
- `gte`: greater **or equal** than the supplied value.
- `lt`: less than the supplied value.
- `lte`: less **or equal** than the supplied value.

> [!INFO]
> The supported date format are `YYYY-MM-DD`, `YYYY-MM` and `YYYY`.
> 
> When the supplied date is a shortened version of the `YYYY-MM-DD` format, then is equivalent to `YYYY-01-01`.

> [!INFO]
> A lot of indexed resources miss the `time` (time to read) property, if this filter is used and then resources that do not include this property will never be matched.

### Strings

These operators work on **fields** that are text such as `author`, `title`, `tag`, `type` and `lang` :

- `eq`: equal to the supplied value.
- `ne`: **not** equal to the supplied value.
- `cont`: contains the supplied value.
- `ncont`: Does not contain the supplied value.

## Logical operators

The `and` and `or`, operators are supported. As in most programming languages the `and` operator as a higher priority than the `or` operator.

## Examples

Here are a few examples of queries you can do :

- `date.gt:2020 and lang:en` - all post released after 2020 and written in English.
- `date.eq:2024 and author:mizu` - all post released by [@kevin_mizu](https://x.com/kevin_mizu) in 2024.
- `tag:"Malware Development"` - all post related to **Malware Development** (quotes must be used).

> [!TIP]
> A post can have multiple authors and so it might be interesting to chain `and` operators between `authors`.

## TODO

- Implement `regex` operator
- Support more logical operators such as `xor`?

## Credits

- [Caido](https://caido.io) for creating [HTTPQL](https://docs.caido.io/reference/httpql) which I highly took inspiration from.
