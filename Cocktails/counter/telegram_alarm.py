import telebot
from .models import Place
from Cocktails.secret_config import (
    bot_config,
    counters_id_list,
)

token = bot_config['token']
bot = telebot.TeleBot(token)

def telegram_send_massege_new_order(order):
    place = Place.objects.filter(id=order['place'])[0].name
    text = f'You have new order #{order["id"]} from {place} check it'
    for counter in counters_id_list:
        bot.send_message(counter, text)


def telegram_send_massege_update_order(order):
    print(order)
    text = f'You have update order #{order.id} from {order.place} check it'
    for counter in counters_id_list:
        bot.send_message(counter, text)
 