import React, { Component } from 'react';
import { actions } from 'mirrorx';
import Form from 'bee-form';
import { Col, Row, FormControl, Label, Select, Radio, Switch, Button, Message } from "tinper-bee";
const FormItem = Form.FormItem;
import moment from 'moment';
import DatePicker from 'bee-datepicker';
import 'bee-datepicker/build/DatePicker.css';

import CommonTitle from '../CommonTitle';
import Header from 'components/Header';
import SearchForm from './SearchForm';
import CustomerInfo from './CustomerInfo';
import GoodsInfo from './GoodsInfo';
import EditSalesTable from './EditSalesTable';

import './index.less'

class SalesNotice extends Component {
    constructor(props){
        super(props)
        this.state = {
            formData: {},
            checked: true,
            approvalState: ""
        }
    }
   
    getCellsData(){
        const { getFieldProps, getFieldError } = this.props.form;
        let _this = this;

        return [
            { name: "航次", codeName: "edu" },
            { name: "码头", codeName: "customerName" },
            // { name: "20尺", codeName: "customerName" },
            // { name: "40尺", codeName: "customerName" },
            { name: "散装", codeName: "customerName" },
            { name: "CFS", codeName: "customerName" },
            { name: "SAO", codeName: "customerName" },
            { name: "中午前结算", codeName: "isSettlement", children: () => {
                return (
                    <Switch
                        checked={this.state.checked}
                        
                        {
                            ...getFieldProps("isSettlement", {
                                initialValue: '',
                                onChange(){
                                    _this.setState({
                                        checked: !_this.state.checked
                                    });
                                }
                            })
                        }
                    />
                )
            } },
            { name: "联络人", codeName: "customerName" },
            { name: "电话", codeName: "customerName" },
            { name: "目的港", codeName: "customerName" },
            { name: "每船限重", codeName: "customerName" },
            { name: "公证行", codeName: "customerName" },
            { name: "领货地点", codeName: "customerName" },
            { name: "领货号码", codeName: "customerName" },
            { name: "交货地点", codeName: "customerName" },
            { name: "揽货公司", codeName: "customerName" }
        ]
    } 
    
    RenderCells({ name, codeName, value, index, children }) {
        const { getFieldProps, getFieldError } = this.props.form;

        return (
            <Col key={index} md={4} xs={6}>
                <FormItem>
                    <Label>{name}：</Label>
                    { (typeof children == "function") ? children() : (
                        <FormControl className="form-item"
                            {
                                ...getFieldProps(codeName, {
                                    initialValue: ''
                                })
                            }
                        />
                    )}
                    <span className='error'>
                        {getFieldError(codeName)}
                    </span>
                </FormItem>
            </Col>
        )
    } 
    /**
     * 获取填写的销货通知单表单信息的数据
     */
    getFormData = () => {
        let _this = this;

        this.props.form.validateFields((error,values)=>{
            if(error) {
                Message.create({ content: '请继续完善信息', color: 'warning' });
                return ;
            }
            _this.setState({ formData: values });
        })
    }
    /**
     * 获取所有数据，执行提交保存操作
     */
    saveForm = () => {
        this.getFormData();
        let tableEditedData = actions.salesNotice.tableEditedData ;

        if(tableEditedData && tableEditedData.length) Message.create({ content: '请完善销货单明细信息', color: 'warning' });

        let result = actions.salesNotice.postAllData({
            formData: this.state.formData,
            tableEditedData: tableEditedData
        });

        if (result.data.success) {
            // this.setState({ loading: false });
            // this.loadList();
            Message.create({ content: '保存成功', color: 'success' });
        }
    }
   
    render(){
        const { getFieldProps, getFieldError } = this.props.form;
        let _this = this;

        return (
            <div className="sales-notice">
                <Header title="销货通知单" back={true}>
                    <div className='head-btn' >
                        <Button className='head-save' onClick={this.saveForm}>确认创建</Button>
                    </div>
                </Header>
                <SearchForm {...this.props} />
                <CustomerInfo customerInfo={ this.props.customerInfo } />
                <div className="edit-sales-form common-panel edit-panel">
                    <CommonTitle title="销货通知单信息填写" type="uf-pencil-c" />
                    <Row className="edit-body">
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>销货单号：</Label><span className='mast'>*</span>
                                <FormControl className="form-item"
                                    {
                                    ...getFieldProps('customerCode', {
                                        initialValue: '',
                                        rules: [{required: true,message: "请输入单号"}]
                                    })
                                    }
                                />
                                <span className='error'>
                                    {getFieldError('customerCode')}
                                </span>
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                    <Label className='time'>结算日：</Label><span className='mast'>*</span>
                                    <DatePicker className="form-item" format={'YYYY-MM-DD'}
                                        {
                                            ...getFieldProps('voucherDate', {
                                                initialValue: '',
                                            })
                                        }
                                    />
                                </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                <Label>船公司：</Label><span className='mast'>*</span>
                                <Select className='form-item' {
                                    ...getFieldProps('transportation', {
                                        initialValue: '',
                                        rules: [{required: true,message: "请输入船公司名称"}]
                                    })
                                }>
                                    <Option value="0">中船重工</Option>
                                    <Option value="1">大连航运</Option>
                                    <Option value="2">铁路</Option>
                                    <Option value="3">航空</Option>
                                </Select>
                                <span className='error'>
                                    {getFieldError('transportation')}
                                </span>
                            </FormItem>
                        </Col>
                        <Col md={4} xs={6}>
                            <FormItem>
                                    <Label>规格：</Label>
                                    <Radio.RadioGroup
                                        selectedValue={this.state.approvalState}
                                        {
                                            ...getFieldProps('approvalState', {
                                                initialValue: '',
                                                onChange(value) {
                                                    _this.setState({ approvalState: value });
                                                },
                                            })
                                        }
                                    >
                                        <Radio value="0">20尺</Radio>
                                        <Radio value="1">40尺</Radio>
                                    </Radio.RadioGroup>
                                </FormItem>
                        </Col>
                        {this.getCellsData().map((item, index) => {
                            let args = Object.assign(item, { index})
                            return this.RenderCells(args)
                        })}
                    </Row>
                    <Row>
                        <Col md={12} sm={9} xs={6}>
                            <Label style={{ marginLeft: "10px", float: "left", width: "90px"}}>备注信息：</Label>
                            <FormItem>
                                <textarea
                                        placeholder="请输入描述"
                                        {
                                            ...getFieldProps('roleDescribe', {
                                                initialValue: "",
                                            }
                                        ) }
                                    />
                            </FormItem>
                        </Col>
                    </Row>
                </div>
                <GoodsInfo {...this.props} />
                <EditSalesTable {...this.props} />
            </div>
        )
    }
}

export default Form.createForm()(SalesNotice)