import React from "react";
import { useHistory } from "react-router";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import { Avatar, Button, Form, Image, Input, Modal, Popconfirm } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useStore } from "../../hooks/useStore";
import reqs from "../../api/req";
import { notify } from "../../utils";

interface IForm {
    phone: string;
    password: string;
}

const TopMySelf: React.FC = observer(() => {
    const store = useStore();
    const history = useHistory();
    const [form] = Form.useForm();

    const [loginModal, setLoginModal] = React.useState<boolean>(false);

    const onFinish = (values: IForm) => {
        reqs.neteaseLogined
            .userLoginByPhone(values.phone, values.password)
            .then((res) => {
                if (res.code === 200) {
                    store.updateUserInfo(
                        res.profile.userId,
                        res.profile.nickname,
                        res.profile.avatarUrl
                    );
                    notify("success", "登录成功！");
                } else {
                    throw res;
                }
            })
            .catch((e) => {
                notify(
                    "error",
                    e.message || "登录失败，请仔细核对账号和密码后重试！"
                );
            })
            .finally(() => {
                setLoginModal(false);
            });
    };

    const onReset = () => {
        form.resetFields();
    };

    const logOut = React.useCallback(() => {
        store.updateUserInfo(0, "", "");
    }, [store]);

    const toUser = React.useCallback(() => {
        if (store.userInfo.userId) {
            const path = `/user/${store.userInfo.userId}`;
            history.location.pathname !== path && history.push(path);
        }
    }, [history, store.userInfo.userId]);

    return (
        <StyledTopMy>
            {store.userInfo.userId === 0 ? (
                <StyledContent onClick={() => setLoginModal(true)}>
                    <Avatar src={<UserOutlined style={{ fontSize: 16 }} />} />
                    <div>请登录</div>
                </StyledContent>
            ) : (
                <StyledContent>
                    <Image
                        width={32}
                        height={32}
                        preview={false}
                        src={store.userInfo.userCover}
                        onClick={toUser}
                    />
                    <Popconfirm
                        title="确定要退出当前登录吗？"
                        okText="是的"
                        cancelText="否"
                        placement="bottom"
                        onConfirm={logOut}
                    >
                        <div style={{ marginLeft: 6 }}>
                            {store.userInfo.userName}
                        </div>
                    </Popconfirm>
                </StyledContent>
            )}

            <Modal title="登录" visible={loginModal} footer={null}>
                <Form preserve={false} form={form} onFinish={onFinish}>
                    <Form.Item
                        label="手机号"
                        name="phone"
                        rules={[
                            {
                                required: true,
                                message: "请输入您的手机号!",
                            },
                        ]}
                    >
                        <Input allowClear={true} />
                    </Form.Item>

                    <Form.Item
                        label="密码"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "请输入密码!",
                            },
                        ]}
                    >
                        <Input.Password allowClear={true} />
                    </Form.Item>

                    <Form.Item>
                        <StyledContent>
                            <Button
                                style={{ marginRight: 25 }}
                                htmlType="button"
                                type="link"
                                onClick={onReset}
                            >
                                重置
                            </Button>
                            <Button
                                style={{ marginRight: 25 }}
                                htmlType="button"
                                onClick={() => setLoginModal(false)}
                            >
                                取消
                            </Button>
                            <Button type="primary" htmlType="submit">
                                登录
                            </Button>
                        </StyledContent>
                    </Form.Item>
                </Form>
            </Modal>
        </StyledTopMy>
    );
});

export default TopMySelf;

const StyledContent = styled.div`
    display: flex;
    justify-content: center;
`;

const StyledTopMy = styled.div`
    position: absolute;
    z-index: 999;
    top: 10px;
    right: 55px;
    color: #fff;
    font-size: 16px;

    &:hover {
        cursor: pointer;
    }
`;
