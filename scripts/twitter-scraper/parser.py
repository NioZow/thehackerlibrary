from bs4 import BeautifulSoup
from json import loads, dump
from os import listdir, getenv

def extract_posts_urls(filename: str):
    # open my twitter bookmarks and search for: Bookmarks?variables
    with open(filename, "r") as f:
        urls_array = []

        content = loads(f.read())

        instructions = content["data"]["bookmark_timeline_v2"]["timeline"]["instructions"]

        for instruction in instructions:
            entries = instruction["entries"]
            for entry in entries:
                content = entry["content"]

                if content["entryType"] == "TimelineTimelineItem":

                    result = entry["content"]["itemContent"]["tweet_results"]["result"]

                    if result["__typename"] == "Tweet":
                        urls = entry["content"]["itemContent"]["tweet_results"]["result"]["legacy"]["entities"]["urls"]

                        for url in urls:
                            urls_array.append(url["expanded_url"])
    return urls_array

def extract_all_posts_urls(directory: str):
    files = listdir(directory)

    urls = []

    for file in files:
        if file.startswith("data") and file.endswith(".json"):
            urls.extend(extract_posts_urls(f"{directory}/{file}"))

    # remove duplicates
    return list(set(urls))

def export_all_urls(urls, filename: str):
    with open(filename, "w") as f:
        dump(urls, f, indent=4)

def load_exported_urls(filename: str):
    with open(filename, "r") as f:
        return loads(f.read())

def fetch_post(url: str):
    res = requests.get(url)
    if res.status_code != 200:
        raise Exception(f"{url} returned {res.status_code}")

    return res.text

def extract_post_title(html_content: str):
    soup = BeautifulSoup(html_content, "html.parser")
    return soup.title.string

def find_h1_title(html_content: str, title: str):
    soup = BeautifulSoup(html_content, "html.parser")
    h1_tags = soup.find_all('h1')

    lines = html_content.splitlines()

    for h1 in h1_tags:
        if title in h1.text:
            for index, line in enumerate(lines):
                if str(h1) in line:
                    return index + 1

    raise Exception("not found")

def reformat_post_title(title: str):
    possible_titles = [title]

    if title.count("|") == 1:
        possible_titles.append(title.split("|")[0])
        possible_titles.append(title.split("|")[1])

    if title.count(" - ") == 1:
        possible_titles.append(title.split(" - ")[0])
        possible_titles.append(title.split(" - ")[1])

    return possible_titles
