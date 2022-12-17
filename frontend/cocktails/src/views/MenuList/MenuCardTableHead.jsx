import React from "react";
import '../../styles/menu_list_table_head.scss'
export function MenuListTableHead(){

    return(
        <div className="menu_list_tabel_head_wrapper">
            <div className="menu_list_table_head_slot id">ID</div>
            <div className="menu_list_table_head_slot name">Name</div>
            <div className="menu_list_table_head_slot current">
                <div>
                    <span>Current</span>
                </div>
            </div>
        </div>
    )
}