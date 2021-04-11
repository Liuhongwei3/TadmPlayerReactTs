import React from "react";
import ReactDOM from "react-dom";
import { Form, Input, Modal, Radio } from "antd";
import { notify } from "../../utils";
import reqs from "../../api/req";

const AddDetailDialog: React.FC = () => {
    const [form] = Form.useForm();
    const [show, setShow] = React.useState<boolean>(true);

    const handleCancel = () => {
        setShow(false);
    };

    const onFinish = React.useCallback(() => {
        form.validateFields()
            .then((values) => {
                reqs.neteaseLogined
                    .createDetail(values.name, values.privacy)
                    .then(() => {
                        notify("success", "新建歌单成功");
                        form.resetFields();
                        handleCancel();
                        setTimeout(() => {
                            window.location.reload();
                        }, 0);
                    })
                    .catch((e) => {
                        notify("error", "新建歌单失败");
                    });
            })
            .catch(() => {
                notify("warning", "请输入正确的内容");
            });
    }, [form]);

    return (
        <Modal
            title="新建歌单"
            okText="新建"
            visible={show}
            onCancel={handleCancel}
            onOk={onFinish}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{ name: "", privacy: 0 }}
            >
                <Form.Item
                    name="name"
                    label="歌单名"
                    rules={[
                        {
                            required: true,
                            message: "请输入歌单名!",
                        },
                    ]}
                >
                    <Input allowClear={true} />
                </Form.Item>
                <Form.Item name="privacy" label="设为隐私">
                    <Radio.Group>
                        <Radio value={0}>否</Radio>
                        <Radio value={10}>是</Radio>
                    </Radio.Group>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const openAddDetailDialog = () => {
    const mountElement = document.createElement("div");
    document.body.appendChild(mountElement);

    ReactDOM.render(<AddDetailDialog />, mountElement);
};

export default openAddDetailDialog;
