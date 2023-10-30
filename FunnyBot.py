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

    if cliengt.user not in message.mentions:
        return
    
    triggers = ['anime', 'null']
    query = str(message.content).lower()
    response = ''

    for searchterm in triggers: # Loop through the triggers
        if searchterm in query:
            isGif = 'gif' in query
            response = getResponse(searchterm, isGif)
            break

    if response: await message.channel.send(response)

def getResponse(filename, isGif):
    if isGif: filename = filename + 'Gifs'
    else: filename = filename + 'Responses'
        
    with open('Messages/{}.txt'.format(filename), 'r') as file:
        responses = file.readlines()
        randomResponse = random.choice(responses).strip()
        return randomResponse
     

client.run(TOKEN)
