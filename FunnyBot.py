import os
import discord
import random
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')
GUILD_NAME = os.getenv('GUILD_NAME')

client = discord.Client(intents=discord.Intents.default())


@client.event
async def on_ready():
    print(f'{client.user} has connected to Discord!')


@client.event
async def on_message(message):
    if message.author == client.user:
        return

    if cliengt.user in message.mentions:
        if "anime" in message.content:
            if "gif" in message.content:
                with open('Messages/AnimeGifs.txt', 'r') as ag:
                    responses = [line.strip() for line in ag]
                    response = random.choice(responses)
                    await message.channel.send(response)
            else:
                with open('Messages/Anime.txt', 'r') as a:
                    responses = [line.strip() for line in a]
                    response = random.choice(responses)
                    await message.channel.send(response)
        if "null" in message.content or "Null" in message.content or "NULL" in message.content:
            if "gif" in message.content:
                with open('Messages/NULLGifs.txt', 'r') as ng:
                    responses = [line.strip() for line in ng]
                    response = random.choice(responses)
                    await message.channel.send(response)
            else:
                with open('Messages/NULLResponses.txt', 'r') as f:
                    responses = [line.strip() for line in f]
                    response = random.choice(responses)
                    await message.channel.send(response)


client.run(TOKEN)
