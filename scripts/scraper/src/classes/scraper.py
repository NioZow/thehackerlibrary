import requests
from json import loads
from typing import List

from src.utils.token import get_token


class Tweet:
    def __init__(self, tweet_id):
        token = get_token(str(tweet_id))
        lang = "en"

        # get tweet data
        res = requests.get(f"https://cdn.syndication.twimg.com/tweet-result?id={tweet_id}&lang={lang}&token={token}")
        if res.status_code != 200:
            raise Exception("invalid tweet id")

        # convert the data as a dict
        self.tweet = loads(res.text)

        # extract important parameters
        self.text = self.tweet.get("text")
        self.id = self.tweet.get("id_str")
        self.author = self.tweet.get("user")

        if self.text is None or self.author is None or self.id is None:
            raise Exception("invalid tweet")

        self.author = self.author["name"]

        if len(self.tweet["entities"]["urls"]) == 0:
            print(f"[INFO] Tweet: {self.id} from {self.author} does not have any url, skipping!")
            self.url = ""
        elif len(self.tweet["entities"]["urls"]) > 1:
            print(f"[INFO] Tweet: {self.id} from {self.author} has more than one url, skipping!")
            self.url = ""
        else:
            self.url = self.tweet["entities"]["urls"][0]["expanded_url"]

    def get(self):
        return self.tweet


def load_tweets(path: str) -> List[Tweet]:
    tweets = []

    with open(path, "r") as f:
        content = loads(f.read())

        for tweet_data in content["data"]["bookmark_timeline_v2"]["timeline"]["instructions"][0]["entries"]:
            tweet_id = tweet_data["entryId"].split("-")[1]

            try:
                tweets.append(Tweet(tweet_id))
            except:
                pass

    return tweets
