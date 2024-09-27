import os
import requests
from dotenv import load_dotenv
from kor import create_extraction_chain, Object, Text
from langchain_openai import ChatOpenAI

load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
assert OPENAI_API_KEY != "" and OPENAI_API_KEY is not None, 'OPENAI_API_KEY environment variable not set'

llm = ChatOpenAI(
    model_name="gpt-3.5-turbo",
    temperature=0,
    max_tokens=2000,
    frequence_penalty=0,
    presence_penalty=0,
    top_p=0,
)

schema = Object(
    id="player",
    description=(
        "You have to extract some informations from a blog post."
    ),
    attributes=[
        Text(
            id="title",
            description="the title the post",
            examples=[],
            many=False,
        ),
        Text(
            id="date",
            description="the date the post was released",
            examples=["7 september 2023", "07/09/2023"],
            many=False,
        ),
        Text(
            id="author",
            description="the author of the post",
            examples=[("By Paul Simon", "Authors: Paul Simon")],
            many=True,
        ),
        Text(
            id="tags",
            description="the topics of the post",
            examples=["Malware Development", "Web", "Active Directory", "ADCS", "SCCM", "Rootkit", "Linux", "CVE", "Exploit Development"],
        ),
    ],
    many=False,
)

def prompt(html_content):
    chain = create_extraction_chain(llm, schema, encoder_or_encoder_class='json')
    test = chain.invoke(html_content)
    print(test)
