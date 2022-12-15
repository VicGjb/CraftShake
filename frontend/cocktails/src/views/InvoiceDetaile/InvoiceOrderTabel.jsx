import React1 from "react";
import '../../styles/invoice_order_table.scss'

export function InvoiceOrderTable({order}){


    return(
        <div className="invoice_order_table_wrapper">
            <div className="invoice_order_taible_date">
                <span>Order № {order.id}</span> 
                <span>{order.date}</span>
            </div>
            <InvoiceOrderItemsTableHead/>
            {order.order_item.map(item=>(
               <InvoiceOrderItemCard key={item.id} item={item}/> 
            ))}
            <div className="invoice_order_table_total">
                <span>Total: </span><span>{order.total_price}</span>
            </div>
        </div>
    )
}

export function InvoiceOrderItemsTableHead(){
    return(
        <div className="invoice_order_table_head_wrapper">
            <div className="invoice_order_table_head_slot name">Name</div>
            <div className="invoice_order_table_head_slot qnt">Qnt</div>
            <div className="invoice_order_table_head_slot price">Price</div>
        </div>
    )
}

export function InvoiceOrderItemCard({item}){
    return(
        <div className="invoice_order_item_card_wrapper">
            <div className="invoice_order_item_slot name">{item.name}</div>
            <div className="invoice_order_item_slot qnt">{item.quantity}</div>
            <div className="invoice_order_item_slot price">{item.item_price}</div>
        </div>
    )
}