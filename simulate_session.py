import asyncio
import datetime
import random
from datetime import timedelta
import requests
import sys


async def start_session(length_in_minutes):
    print('Starting session')
    stopping_time = now() + timedelta(minutes=length_in_minutes)

    while now() < stopping_time:
        print('Sending request')
        requests.get('http://localhost:5000/')
        await asyncio.sleep(.5 + random.uniform(-0.5, +0.5))


def now():
    return datetime.datetime.now()


async def main():
    seconds = int(sys.argv[1])

    await start_session(10)


asyncio.run(main())
