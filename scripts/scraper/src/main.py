from src.classes.scraper import Tweet, load_tweets


def main():
    tweets = load_tweets("data/tweets.json")

    for tweet in tweets:
        print(tweet.url)


if __name__ == '__main__':
    main()
