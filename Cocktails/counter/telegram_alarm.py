from Cocktails.secret_config import (
    bot_config,
    counters_id_list,
)

bot = Bot(config['token'])
client=Dispatcher(bot, storage=MemoryStorage())