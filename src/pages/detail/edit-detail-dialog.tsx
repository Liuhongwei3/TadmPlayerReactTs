import React from "react";
import ReactDOM from "react-dom";
import { Form, Input, Modal, Select } from "antd";
import { notify } from "../../utils";
import reqs from "../../api/req";
import TextArea from "antd/lib/input/TextArea";
import { IPlaylist } from "./type";

interface IProps {
    detail: IPlaylist;
}

const options = [
    { groupName: "语种", tags: ["华语", "欧美", "日语", "韩语", "粤语"] },
    {
        groupName: "风格",
        tags: [
            "流行",
            "摇滚",
            "民谣",
            "电子",
            "舞曲",
            "说唱",
            "轻音乐",
            "爵士",
            "乡村",
            "R&B/Soul",
            "古典",
            "民族",
            "英伦",
            "金属",
            "蓝调",
            "雷鬼",
            "世界音乐",
            "拉丁",
            "New Age",
            "古风",
            "后摇",
            "Bossa Nova",
        ],
    },
    {
        groupName: "场景",
        tags: [
            "清晨",
            "夜晚",
            "学习",
            "工作",
            "午休",
            "下午茶",
            "地铁",
            "驾车",
            "运动",
            "旅行",
            "散步",
            "酒吧",
        ],
    },
    {
        groupName: "情感",
        tags: [
            "怀旧",
            "清新",
            "浪漫",
            "伤感",
            "治愈",
            "放松",
            "孤独",
            "感动",
            "兴奋",
            "快乐",
            "安静",
            "思念",
        ],
    },
    {
        groupName: "主题",
        tags: [
            "综艺",
            "影视原声",
            "ACG",
            "儿童",
            "校园",
            "游戏",
            "70后",
            "80后",
            "90后",
            "网络歌曲",
            "KTV",
            "经典",
            "翻唱",
            "吉他",
            "钢琴",
            "器乐",
            "榜单",
            "00后",
        ],
    },
];

const EditDetailDialog: React.FC<IProps> = (props: IProps) => {
    const [form] = Form.useForm();
    const { detail } = props;
    const [show, setShow] = React.useState<boolean>(true);

    const handleCancel = () => {
        setShow(false);
    };

    const onFinish = React.useCallback(() => {
        form.validateFields()
            .then((values) => {
                reqs.neteaseLogined
                    .editDetail(
                        detail.id,
                        values.name,
                        values.desc,
                        values.tags
                    )
                    .then(() => {
                        notify("success", "更新歌单成功");
                        form.resetFields();
                        handleCancel();
                        setTimeout(() => {
                            window.location.reload();
                        }, 100);
                    })
                    .catch((e) => {
                        notify("error", "更新歌单失败");
                    });
            })
            .catch(() => {
                notify("warning", "请输入正确的内容");
            });
    }, [detail, form]);

    return (
        <Modal
            title="更新歌单"
            okText="保存"
            visible={show}
            onCancel={handleCancel}
            onOk={onFinish}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    name: detail.name,
                    desc: detail.description,
                    tags: detail.tags,
                }}
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
                <Form.Item
                    name="desc"
                    label="歌单描述"
                    rules={[
                        {
                            required: true,
                            message: "请输入歌单描述!",
                        },
                    ]}
                >
                    <TextArea rows={2} allowClear={true} />
                </Form.Item>
                <Form.Item
                    name="tags"
                    label="标签（最多添加三个）"
                    rules={[
                        {
                            required: true,
                            message: "请输入歌单描述!",
                        },
                        {
                            type: "array",
                            max: 3,
                            message: "最多只能添加三个标签",
                        },
                    ]}
                >
                    <Select mode="multiple" showSearch={true} allowClear={true}>
                        {options.map((group) => (
                            <Select.OptGroup
                                key={group.groupName}
                                label={group.groupName}
                            >
                                {group.tags.map((tag) => (
                                    <Select.Option key={tag} value={tag}>
                                        {tag}
                                    </Select.Option>
                                ))}
                            </Select.OptGroup>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};

const openEditDetailDialog = (detail: IPlaylist) => {
    const mountElement = document.createElement("div");
    document.body.appendChild(mountElement);

    ReactDOM.render(<EditDetailDialog detail={detail} />, mountElement);
};

export default openEditDetailDialog;
