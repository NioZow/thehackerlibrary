from ai import *
from parser import *


def main():
    #urls = extract_all_posts_urls("data/")
    #export_all_urls(urls, "data/posts.json")

    post_html = fetch_post("https://rootkits.xyz/blog/2017/09/kernel-write-what-where/")

    title = extract_post_title(post_html)

    possible_titles = reformat_post_title(title)

    lines = post_html.splitlines()

    for possible_title in possible_titles:
        try:
            line_number = find_h1_title(post_html, possible_title)
            post_stripped = "\n".join(lines[line_number:line_number + 200])
            #print(extract_post_info(post_stripped))
            prompt(post_stripped)
            break
        except:
            pass

    #print("\n".join(post_html.split("\n")[:400]))

    #print(extract_post_info())

if __name__ == '__main__':
    main()