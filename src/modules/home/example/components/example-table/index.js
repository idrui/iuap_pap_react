import React, { Component } from 'react'
import { actions } from "mirrorx";
import { Table,Button } from 'tinper-bee'
import moment from "moment/moment";

export default class BoardTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }
    }
    /**
     * 编辑
     */
    edit=(record,editFlag)=>{
        // actions.routing.push(
        //     {
        //         pathname: 'example-edit',
        //         detailObj: record,
        //         editFlag: !!editFlag
        //     }
        // )
        console.log('进入编辑')
    }
    render(){
        const self = this;
        const column = [
            {
                title: "序号",
                dataIndex: "index",
                key: "index",
                render(record, text, index) {
                    return index + 1;
                }
            },
            {
                title: "订单编号",
                dataIndex: "orderCode",
                key: "orderCode",
                onCellClick: (record) => this.cellClick(record, false)
            },
            {
                title: "供应商名称",
                dataIndex: "supplierName",
                key: "supplierName",
                width: 300
            },
            {
                title: "类型",
                dataIndex: "type_name",
                key: "type_name",
                width: 100
            },
            {
                title: "采购组织",
                dataIndex: "purchasing",
                key: "purchasing",
                width: 100
            },
            {
                title: "采购组",
                dataIndex: "purchasingGroup",
                key: "purchasingGroup",
                width: 100
            },
            {
                title: "凭证日期",
                dataIndex: "voucherDate",
                key: "voucherDate",
                width: 100,
                render(record, text, index) {
                    return moment(text).format('YYYY-MM-DD')
                }
            },
            {
                title: "审批状态",
                dataIndex: "approvalState_name",
                key: "approvalState_name",
                width: 100
            },
            {
                title: "确认状态",
                dataIndex: "confirmState_name",
                key: "confirmState_name",
                width: 100
            },
            {
                title: "关闭状态",
                dataIndex: "closeState_name",
                key: "closeState_name",
                width: 100
            },
            {
                title: "操作",
                dataIndex: "e",
                key: "e",
                render(text, record, index) {
                    return (
                        <div className='operation-btn'>
                            <Button size='sm' className='edit-btn' onClick={() => { self.edit(record,true) }}>编辑</Button>
                        </div>
                    )
                }
            }
        ];
        const { list,showLoading,pageSize, pageIndex, totalPages, } = this.props;
        return (
            <div className="example-table table-list">
                <Table
                    loading={{show:showLoading,loadingType:"line"}}
                    rowKey={(r,i)=>i}
                    columns={column}
                    data={list}
                />       
            </div>
        )
    }
}