import React from "react"
import cx from "classnames"
import useStatusContext from "../../hooks/use-status-context";
import {useRouter} from "next/router";
import {Menu, Layout, Dropdown, Button, Divider} from "antd";
import {SettingOutlined} from '@ant-design/icons';

const {Header} = Layout;
const {SubMenu} = Menu;

function ManageHeader() {

    const router = useRouter();
    const [menuOpen, setMenuOpen] = React.useState(false);

    const state = useStatusContext();

    const handleMenuToggle = () => {
        setMenuOpen((prevOpen) => !prevOpen);
    };

    const handleClick = (event) => {

        setMenuOpen(false);
    };

    const goto = (path) => {
        if (!path) return;
        router.push(path);
    }

    const menu = (
        <Menu>
            <Menu.Item key="sub-item:1"
                       onClick={() => goto("/manage")}>Dashboard</Menu.Item>
            <Menu.Item key="sub-item:2"
                       onClick={() => goto("/manage/posts")}>Posts</Menu.Item>
            <Menu.Item key="sub-item:3"
                       onClick={() => goto("/manage/pages")}>Pages</Menu.Item>
            <Menu.Item key="sub-item:4"
                       onClick={() => goto("/manage/projects")}>Projects</Menu.Item>
            <Menu.Item key="sub-item:5"
                       onClick={() => goto("/manage/storage")}>Storage</Menu.Item>
            <Menu.Item key="sub-item:6"
                       onClick={() => goto("/manage/settings")}>Settings</Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="sub-item:7"
                       onClick={() => goto("/manage/logout")}>Logout</Menu.Item>
        </Menu>
    )

    return (
        <Header className="manage-header">
            <div className="brand">BA</div>
            <Dropdown overlay={menu} overlayStyle={{minWidth: 140}}>
                <Button type="primary" icon={<SettingOutlined/>}
                        onClick={e => e.preventDefault()}/>
            </Dropdown>
        </Header>
    )
}

export default ManageHeader
