import React from "react";
import { useHistory } from "react-router";
import { observer } from "mobx-react-lite";
import styled from "styled-components";
import {
    Avatar,
    Button,
    Form,
    Image,
    Input,
    InputNumber,
    Modal,
    Popconfirm,
    Typography,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useStore } from "../../hooks/useStore";
import reqs from "../../api/req";
import { notify, setOutDateCookie } from "../../utils";

interface IForm {
    phone: string;
    password: string;
}

interface IFormCode {
    phone: number;
    code: number;
}

const TopMySelf: React.FC = observer(() => {
    const store = useStore();
    const history = useHistory();
    const [form] = Form.useForm();
    const [form1] = Form.useForm();

    const [loginModal, setLoginModal] = React.useState<boolean>(false);
    const [qrModal, setQrModal] = React.useState<boolean>(false);
    const [codeModal, setCodeModal] = React.useState<boolean>(false);
    const [qrImg, setQrImg] = React.useState<string>("");
    const [qrStatus, setQrStatus] = React.useState<string>("请扫码");

    React.useEffect(() => {
        const userId = window.sessionStorage.getItem("userId");
        const nickname = window.sessionStorage.getItem("nickname");
        const avatarUrl = window.sessionStorage.getItem("avatarUrl");

        if (userId && nickname && avatarUrl) {
            store.updateUserInfo(+userId, nickname, avatarUrl);
        }
    }, [store]);

    const onFinish = (values: IForm) => {
        reqs.neteaseLogined
            .userLoginByPhone(values.phone, values.password)
            .then((res) => {
                if (res.code === 200) {
                    document.cookie = res.cookie;
                    logSuccess(
                        res.profile.userId,
                        res.profile.nickname,
                        res.profile.avatarUrl
                    );
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

    const onFinish1 = (values: IFormCode) => {
        reqs.neteaseLogined
            .checkCodeByPhone(values.phone, values.code)
            .then((res) => {
                if (res.code === 200) {
                    notify("success", "登录成功！");
                } else {
                    throw res;
                }
            })
            .catch((e) => {
                notify("error", e || e.message || "验证码错误！");
            })
            .finally(() => {
                setCodeModal(false);
            });
    };

    const onReset = () => {
        form.resetFields();
    };

    const sendCode = React.useCallback(() => {
        const phone = form1.getFieldValue("phone");
        if (phone) {
            reqs.neteaseLogined.sendCodeByPhone(phone);
        } else {
            notify("warning", "请先输入正确的手机号");
        }
    }, [form1]);

    const getQrImg = React.useCallback(async () => {
        let key = "";
        try {
            const keyRes = await reqs.neteaseLogined.getLoginQRKey();
            key = keyRes.data.unikey;
            const imgRes = await reqs.neteaseLogined.getLoginQR(key);

            setQrImg(imgRes.data.qrimg);
            return key;
        } catch (e) {
            notify("error", e.message || "获取二维码 Key失败");
        }
    }, []);

    const toUser = React.useCallback(() => {
        if (store.userInfo.userId) {
            const path = `/user/${store.userInfo.userId}`;
            history.location.pathname !== path && history.push(path);
        }
    }, [history, store.userInfo.userId]);

    const logSuccess = React.useCallback(
        (userId: number, nickname: string, avatarUrl: string) => {
            store.updateUserInfo(userId, nickname, avatarUrl);
            window.sessionStorage.setItem("userId", String(userId));
            window.sessionStorage.setItem("nickname", nickname);
            window.sessionStorage.setItem("avatarUrl", avatarUrl);
            notify("success", "登录成功！");
            toUser();
        },
        [store, toUser]
    );

    React.useEffect(() => {
        let timer: NodeJS.Timeout;

        if (qrModal) {
            getQrImg().then((qrKey) => {
                timer = setInterval(() => {
                    reqs.neteaseLogined.checkQRStatus(qrKey!).then((res) => {
                        const { code, message } = res;

                        setQrStatus(message);
                        // code -- 801 -- 等待扫码
                        if (code === 800) {
                            clearInterval(timer);
                            notify("warning", "二维码已过期,请重新获取");
                        }
                        if (code === 803) {
                            clearInterval(timer);
                            reqs.neteaseLogined.loginStatus().then((res) => {
                                logSuccess(
                                    res.data.profile.userId,
                                    res.data.profile.nickname,
                                    res.data.profile.avatarUrl
                                );
                            });
                            setQrModal(false);
                        }
                    });
                }, 3000);
            });
        }

        // cleanup
        return () => {
            clearInterval(timer);
        };
    }, [getQrImg, logSuccess, qrModal, store]);

    const logOut = React.useCallback(() => {
        window.sessionStorage.clear();
        store.updateUserInfo(0, "", "");
        store.updateUserPlaylists([]);
        setOutDateCookie();
        reqs.neteaseLogined
            .logOut()
            .then((res) => {
                history.push("/");
            })
            .catch((e) => {
                notify("error", e.message);
            });
    }, [history, store]);

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

            <Modal
                title="手机号密码登录"
                visible={loginModal}
                onCancel={() => setLoginModal(false)}
                onOk={() => {
                    form.validateFields()
                        .then((values) => {
                            form.resetFields();
                            setLoginModal(false);
                            onFinish(values);
                        })
                        .catch((info) => {
                            console.warn("Validate Failed:", info);
                            notify("warning", "请输入正确格式的内容");
                        });
                }}
            >
                <Form preserve={false} form={form}>
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
                                onClick={() => {
                                    setLoginModal(false);
                                    setCodeModal(false);
                                    setQrModal(true);
                                }}
                            >
                                二维码登录
                            </Button>
                            <Button
                                style={{ marginRight: 25 }}
                                htmlType="button"
                                type="link"
                                onClick={() => {
                                    setLoginModal(false);
                                    setQrModal(false);
                                    setCodeModal(true);
                                }}
                            >
                                手机验证码登录
                            </Button>
                            <Button
                                style={{ marginRight: 25 }}
                                htmlType="button"
                                type="link"
                                onClick={onReset}
                            >
                                重置
                            </Button>
                        </StyledContent>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title="二维码登录"
                width={360}
                visible={qrModal}
                onCancel={() => setQrModal(false)}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <div>
                        当前状态：
                        <span style={{ color: "#de87ab" }}>{qrStatus}</span>
                    </div>
                    <Image src={qrImg} preview={false} />
                    <div>请使用 网易云音乐APP 扫码登录</div>
                    <Button
                        style={{ marginRight: 25 }}
                        htmlType="button"
                        type="link"
                        onClick={() => {
                            setQrModal(false);
                            setLoginModal(true);
                        }}
                    >
                        手机号登录
                    </Button>
                </div>
            </Modal>

            <Modal
                title="手机验证码登录"
                width={400}
                visible={codeModal}
                onCancel={() => setCodeModal(false)}
                onOk={() => {
                    form1
                        .validateFields()
                        .then((values) => {
                            form1.resetFields();
                            setCodeModal(false);
                            onFinish1(values);
                        })
                        .catch((info) => {
                            console.warn("Validate Failed:", info);
                            notify("warning", "请输入正确格式的内容");
                        });
                }}
            >
                <Form preserve={false} form={form1}>
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
                        <InputNumber style={{ width: 200 }} />
                    </Form.Item>

                    <Form.Item
                        label="验证码"
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: "请输入验证码!",
                            },
                        ]}
                    >
                        <InputNumber style={{ width: 120 }} />
                    </Form.Item>
                    <Button type="primary" onClick={sendCode}>
                        发送验证码
                    </Button>

                    <Typography.Title level={5}>
                        Tips: 暂时未实现验证码登录，敬请期待！
                    </Typography.Title>
                </Form>
            </Modal>
        </StyledTopMy>
    );
});

export default TopMySelf;

const StyledContent = styled.div`
    display: flex;
    justify-content: flex-start;
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
