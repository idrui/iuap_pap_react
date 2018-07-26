import React,{Component} from 'react'
import mirror, {actions, connect} from 'mirrorx'
import {Navbar,Menu,FormControl,Badge,Icon} from 'tinper-bee'
import './header.less'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const MenuToggle = Menu.MenuToggle;
const SideContainer = Menu.SideContainer;

const NavItem = Navbar.NavItem;
const Headers = Navbar.Header;
const Brand = Navbar.Brand;
const Nav = Navbar.Nav;

class Header extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            expanded: true,
        }

    }
    onToggle(value) {
        this.setState({expanded: value});
    }
    chooseLang = lang => {
        actions.intl.updateState({lang: lang})
    }
    render(){
        let {expanded} = this.props;
        return (
            <Navbar className="header" fluid expanded={this.state.expanded} onToggle={this.onToggle.bind(this)}>
                <MenuToggle show/>
                <Headers>
                    <Brand>
                        <a href="javascript:;" onClick={() => actions.sidebar.setExpanded()}>
                            <i className="navmenu uf uf-navmenu"></i>
                        </a>
                    </Brand>
                </Headers>

                <Nav pullRight>
                    <span className="lang" onClick={() => this.chooseLang("zh")}>中文</span>
                    <span className="lang" onClick={() => this.chooseLang("en")}>english</span>
                    {/*<Menu mode="horizontal" className="dropdown">*/}
                    {/*<SubMenu title={<span><span className="avatar-icon"><img src="https://gw.alipayobjects.com/zos/rmsportal/eHBsAsOrrJcnvFlnzNTT.png" /></span>赵宇<Icon type="uf-triangle-down"></Icon></span>}>*/}
                    {/*<Menu.Item key="setting:2"><i className="uf uf-users-o"></i>个人中心</Menu.Item>*/}
                    {/*<Menu.Item key="setting:3"><i className="uf uf-settings"></i>设置</Menu.Item>*/}
                    {/*<Menu.Item key="setting:4"><i className="uf uf-plug-o"></i>退出登录</Menu.Item>*/}
                    {/*</SubMenu>*/}
                    {/*</Menu>*/}
                </Nav>
            </Navbar>
        )
    }

}


export default Header
