import os
import telebot
from .models import Place, OrderItemVolume


token = os.environ.get('TELEGRAM_BOT_KEY')
bot = telebot.TeleBot(token)
counters_id_list = [197634497,]

def telegram_send_massege_new_order(order, order_items):
    print(f'token {token}') # remove IT!!!!!
    place = Place.objects.get(id=order.place_id).name
    text = f'You have new order #{order.id} from {place}:\n'
    for item in order_items:
        volume = OrderItemVolume.objects.get(id=item['volume']).get_name()
        text+=f'{item["name"]} - {volume} - {item["quantity"]}Qty\n'

    for counter in counters_id_list:
        bot.send_message(counter, text)


def telegram_send_massege_update_order(order,new_items,deleted_items):
    print(order)
    text = f'You have update order #{order.id} from {order.place} check it\n'
    if deleted_items:
        text+=f'DELETED COCKTAILS:\n'
        for item in deleted_items:
            text+=f'{item.name} - {item.volume.get_name()} - {item.quantity}Qty\n'

    if new_items:
        text+=f'ADDED NEW COCKTAILS:\n'
        for item in new_items:
            volume = OrderItemVolume.objects.get(id=item['volume']).get_name()
            text+=f'{item["name"]} - {volume} - {item["quantity"]}Qty\n'
    

    for counter in counters_id_list:
        bot.send_message(counter, text)
 