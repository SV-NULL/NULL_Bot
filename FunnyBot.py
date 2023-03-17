# FunnyBot.py
import os
import logging
import discord
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv('DISCORD_TOKEN')

client = discord.Client(intents=discord.Intents.default())

@client.event
async def on_ready():
    print(f'{client.user} has connected to Discord!')

    
logging.basicConfig(level=logging.DEBUG)


client.run(TOKEN)
